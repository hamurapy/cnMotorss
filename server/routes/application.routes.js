const router = require('express').Router();
const { Application } = require('../db/models');

router.get('/', async (req, res) => {
  try {
    const application = await Application.findAll({
      raw: true,
    });
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: 'Server side error occurred' });
  }
});

router.post('/', async (req, res) => {
  const {
    name,
    email,
    phone,
    message,
    carID,
    car,
    carPhoto,
    year,
    color,
    mileage,
    wheel,
    engine,
    driveUnit,
    transmission,
    price,
    status,
  } = req.body;
  try {
    if (name && email && phone && status && !message
      && !carID && !car && !carPhoto && !year
      && !color && !mileage && !wheel && !engine
      && !driveUnit && !transmission && !price) {
      const application = await Application.create({
        name,
        email,
        phone,
        status,
      });
      res.status(200).json(application);
    } else if (name && email && phone && status && message
      && !carID && !car && !carPhoto && !year
      && !color && !mileage && !wheel && !engine
      && !driveUnit && !transmission && !price) {
      const application = await Application.create({
        name,
        email,
        phone,
        message,
        status,
      });
      res.status(200).json(application);
    } else if (name && email && phone && status && !message
      && carID && car && carPhoto && year
      && color && mileage && wheel && engine
      && driveUnit && transmission && price) {
      const application = await Application.create({
        name,
        email,
        phone,
        carID,
        car,
        carPhoto,
        year,
        color,
        mileage,
        wheel,
        engine,
        driveUnit,
        transmission,
        price,
        status,
      });
      res.status(200).json(application);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server side error occurred' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    status,
  } = req.body;
  try {
    const application = await Application.update(
      {
        status,
      },
      { where: { id }, returning: true },
    );
    return res.status(200).json(application[1][0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Application.destroy({ where: { id } });
    res.status(200).json(Number(id));
  } catch (error) {
    res.status(500).json({ error: 'Server side error occurred' });
  }
});
module.exports = router;
