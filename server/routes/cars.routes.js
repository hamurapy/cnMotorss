const router = require('express').Router();
const { Car } = require('../db/models');

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

module.exports = router;
