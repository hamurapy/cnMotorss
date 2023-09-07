const router = require('express').Router();
const { Car, PhotoCar } = require('../db/models');

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
    res.json(carsWithPhotos);
  } catch (error) {
    res.json({ error: error.message });
  }
});
module.exports = router;
