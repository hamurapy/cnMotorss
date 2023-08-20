const router = require('express').Router();
const { User } = require('../db/models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({ order: [['id', 'ASC']] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const {
    name,
    email,
    password,
    admin,
  } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (req.session.userId) {
      user.name = name;
      user.email = email;
      user.password = password;
      user.admin = admin;
      user.save();
      res.json(user);
    } else {
      res.status(403).json({ message: 'Не удалось обновить данные' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
