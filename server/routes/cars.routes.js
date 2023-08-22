/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const multer = require('multer');
const { Car } = require('../db/models');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const fileUploadMiddleware = require('../middleware/fileuploadMiddleware');

router.route('/').get(async (req, res) => {
  try {
    const cars = await Car.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(cars);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const cars = await Car.findOne({ where: { id }, raw: true });
    res.json(cars);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete('/:carId', async (req, res) => {
  const { carId } = req.params;
  try {
    await Car.destroy({ where: { id: carId } });
    res.status(200).json(Number(carId));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', upload.array('img'), async (req, res) => {
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

    // const imgFiles = req.files;
    // console.log(imgFiles);
    // const arrImg = await Promise.all(
    //   imgFiles.map(async (file) => {
    //     try {
    //       const uploadedFile = await fileUploadMiddleware(file);
    //       return uploadedFile;
    //     } catch (error) {
    //       return { error: error.message };
    //     }
    //   }),
    // );

    const car = await Car.create({
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
      // img: arrImg[0],
    });

    res.status(201).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create car.' });
  }
});

module.exports = router;
