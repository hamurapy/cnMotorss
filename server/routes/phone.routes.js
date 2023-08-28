const router = require('express').Router();
const { Phone } = require('../db/models');

router.get('/', async (req, res) => {
    try {
      const phone = await Phone.findAll({
        raw: true,
      });
      res.json(phone);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cars.' });
    }
  });

module.exports = router;
