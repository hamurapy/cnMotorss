const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/', async (req, res) => {
  try {
    if (req.session.userId) {
      const user = await User.findAll({
        where: { id: req.session.userId },
        attributes: { exclude: ['password'] },
      });
      res.json(user);
    }
  } catch ({ message }) {
    res.json(message);
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
  const { id } = req.params;
  const {
    name,
    email,
    password,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS) || 11,
    );
    const user = await User.update(
      {
        name,
        email,
        password: hashedPassword,
      },
      { where: { id }, returning: true },
    );
    return res.status(200).json(user[1][0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS) || 11,
    );
    const user = await User.update(
      {
        password: hashedPassword,
      },
      { where: { id }, returning: true },
    );
    return res.status(200).json(user[1][0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
