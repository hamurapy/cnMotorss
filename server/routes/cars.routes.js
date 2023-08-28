/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const multer = require('multer');
const { Op } = require('sequelize');
require('regenerator-runtime/runtime');
const { sequelize } = require('../db/models');
const { Car, PhotoCar } = require('../db/models');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const fileUploadMiddleware = require('../middleware/fileuploadMiddleware');

router.route('/ss').get(async (req, res) => {
  try {
    const cars = await Car.findAll({
      attributes: ['id'],
      raw: true,
    });
    const carIds = cars.map((car) => car.id);
    res.json(carIds);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch car ids.' });
  }
});

router.route('/filter').get(async (req, res) => {
  try {
    const {
      priceFrom, priceTo, yearFrom, yearTo, brand, model, engine,
      transmission, driveUnit, litersFrom, litersTo, mileageFrom, mileageTo, startIndex, endIndex,
    } = req.query;
    console.log(req.query);
    const filters = {};

    if (priceFrom && priceTo) {
      filters.price = {
        [Op.between]: [priceFrom, priceTo],
      };
    } else if (priceFrom) {
      filters.price = {
        [Op.gte]: priceFrom,
      };
    } else if (priceTo) {
      filters.price = {
        [Op.lte]: priceTo,
      };
    }

    if (yearFrom && yearTo) {
      filters.year = {
        [Op.between]: [yearFrom, yearTo],
      };
    } else if (yearFrom) {
      filters.year = {
        [Op.gte]: yearFrom,
      };
    } else if (yearTo) {
      filters.year = {
        [Op.lte]: yearTo,
      };
    }

    if (mileageFrom && mileageTo) {
      filters.mileage = {
        [Op.between]: [mileageFrom, mileageTo],
      };
    } else if (mileageFrom) {
      filters.mileage = {
        [Op.gte]: mileageFrom,
      };
    } else if (mileageTo) {
      filters.mileage = {
        [Op.lte]: mileageTo,
      };
    }

    if (litersFrom && litersTo) {
      filters.liters = {
        [Op.between]: [litersFrom, litersTo],
      };
    } else if (litersFrom) {
      filters.liters = {
        [Op.gte]: litersFrom,
      };
    } else if (litersTo) {
      filters.liters = {
        [Op.lte]: litersTo,
      };
    }

    if (driveUnit) {
      filters.driveUnit = driveUnit;
    }

    if (transmission) {
      filters.transmission = transmission;
    }

    if (engine) {
      filters.engine = engine;
    }

    if (brand) {
      filters.brand = brand;
    }

    if (model) {
      filters.model = model;
    }
    const cars = await Car.findAll({
      where: filters,
      offset: startIndex,
      limit: endIndex - startIndex,
      order: [['createdAt', 'DESC']],
      raw: true,
    });
    console.log(cars, '<<<<<<<<<<<<<<<<<<<<');
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
        color: car.color,
        liters: car.liters,
        wheel: car.wheel,
        engine: car.engine,
        power: car.power,
        price: car.price,
        driveUnit: car.driveUnit,
        transmission: car.transmission,
        description: car.description,
        photos: carPhotos.map((photo) => ({ img: photo.img })),
      };
    });
    console.log(carsWithPhotos);
    res.json(carsWithPhotos);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.route('/').get(async (req, res) => {
  try {
    const { startIndex, endIndex } = req.query;
    const cars = await Car.findAll({
      order: [['createdAt', 'DESC']],
      offset: startIndex,
      limit: endIndex - startIndex,
      raw: true,
    });

    const carsBrandAndModel = await Car.findAll({
      attributes: ['brand', 'model'],
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
        color: car.color,
        liters: car.liters,
        wheel: car.wheel,
        engine: car.engine,
        power: car.power,
        price: car.price,
        driveUnit: car.driveUnit,
        transmission: car.transmission,
        description: car.description,
        photos: carPhotos.map((photo) => ({ img: photo.img })),
      };
    });
    const responseData = {
      carsWithPhotos,
      carsBrandAndModel,
    };
    res.json(responseData);
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
  const t = await sequelize.transaction();
  try {
    const {
      brand,
      model,
      color,
      liters,
      wheel,
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
        color,
        liters,
        wheel,
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

    await Promise.all(arrImg.map(async (file) => PhotoCar.create(
      {
        carId: car.id,
        img: file,
      },
      { transaction: t },
    )));

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
    color,
    liters,
    wheel,
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
        color,
        liters,
        wheel,
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

    const promises = arrImg.map(async (file) => {
      await PhotoCar.create(
        {
          carId: car.id,
          img: file,
        },
        { transaction: t },
      );
    });

    await Promise.all(promises);

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
