/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const multer = require('multer');
require('regenerator-runtime/runtime');
const { sequelize } = require('../db/models');
const { Car, PhotoCar } = require('../db/models');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const fileUploadMiddleware = require('../middleware/fileuploadMiddleware');

router.route('/').get(async (req, res) => {
  try {
    const cars = await Car.findAll({
      order: [['createdAt', 'DESC']],
      raw: true,
    });
    const carIds = cars.map((car) => car.id);
    const photos = await PhotoCar.findAll({
      where: {
        carId: carIds,
      },
      attributes: ['carId', 'img'],
      group: ['carId', 'PhotoCar.id'],
    });
    const carsWithPhotos = cars.map((car) => {
      const carPhotos = photos.filter((photo) => photo.carId === car.id);
      return {
        id: car.id,
        brand: car.brand,
        model: car.model,
        year: car.year,
        mileage: car.mileage,
        engine: car.engine,
        power: car.power,
        price: car.price,
        driveUnit: car.driveUnit,
        transmission: car.transmission,
        description: car.description,
        photos: carPhotos.map((photo) => ({ img: photo.img })),
      };
    });
    res.json(carsWithPhotos);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findOne({
      where: { id },
      raw: true,
    });

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    const photos = await PhotoCar.findAll({
      where: { carId: id },
      attributes: ['img'],
    });

    const carWithPhotos = {
      ...car,
      photos: photos.map((photo) => ({ img: photo.img })),
    };

    return res.json(carWithPhotos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/:carId', async (req, res) => {
  const { carId } = req.params;
  try {
    await PhotoCar.destroy({ where: { carId } });
    await Car.destroy({ where: { id: carId } });
    res.status(200).json(Number(carId));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', upload.array('img'), async (req, res) => {
  const t = await sequelize.transaction(); // Начало транзакции
  try {
    const {
      brand,
      model,
      engine,
      year,
      mileage,
      power,
      price,
      driveUnit,
      transmission,
      description,
    } = req.body;

    const imgFiles = req.files;

    const arrImg = await Promise.all(
      imgFiles.map(async (file) => {
        try {
          const uploadedFile = await fileUploadMiddleware(file);
          return uploadedFile;
        } catch (error) {
          return { error: error.message };
        }
      }),
    );

    const car = await Car.create(
      {
        brand,
        model,
        engine,
        year,
        mileage,
        power,
        price,
        driveUnit,
        transmission,
        description,
      },
      { transaction: t },
    );

    for (const file of arrImg) {
      await PhotoCar.create(
        {
          carId: car.id,
          img: file,
        },
        { transaction: t },
      );
    }

    await t.commit();
    res.status(201).json(car);
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ error: 'Failed to create car.' });
  }
});

router.put('/:carId', upload.array('img'), async (req, res) => {
  const { carId } = req.params;
  const {
    brand,
    model,
    engine,
    year,
    mileage,
    power,
    price,
    driveUnit,
    transmission,
    description,
  } = req.body;
  const imgFiles = req.files;

  try {
    const car = await Car.update(
      {
        brand,
        model,
        engine,
        year,
        mileage,
        power,
        price,
        driveUnit,
        transmission,
        description,
      },
      { where: { id: carId }, returning: true },
    );

    const arrImg = await Promise.all(
      imgFiles.map(async (file) => {
        try {
          const uploadedFile = await fileUploadMiddleware(file);
          return uploadedFile;
        } catch (error) {
          return { error: error.message };
        }
      }),
    );

    for (const file of arrImg) {
      await PhotoCar.create(
        {
          carId: car.id,
          img: file,
        },
        { transaction: t },
      );
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
