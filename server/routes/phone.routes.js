const router = require('express').Router();
const { Phone } = require('../db/models');

router.get('/', async (req, res) => {
  try {
    const phone = await Phone.findAll({
      raw: true,
    });
    res.json(phone);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const phones = await Phone.findOne({
      raw: true,
      where: { id },
    });
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    phoneNumber, adres, whatsapp, telegram, yandex, google,
  } = req.body;
  try {
    const phone = await Phone.update(
      {
        phoneNumber, adres, whatsapp, telegram, yandex, google,
      },
      { where: { id }, returning: true },
    );
    return res.status(200).json(phone[1][0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
