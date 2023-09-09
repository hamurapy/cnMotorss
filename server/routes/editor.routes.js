const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/', async (req, res) => {
  try {
    const editor = await User.findAll({
      raw: true,
    });
    res.json(editor);
  } catch (error) {
    res.status(500).json({ error: 'Server side error occurred' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const editor = await User.findOne({
      raw: true,
      where: { id },
    });
    res.status(200).json(editor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const {
    name,
    email,
    password,
    admin,
  } = req.body;
  try {
    if (name && email && password && !admin) {
      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.SALT_ROUNDS) || 11,
      );
      const editor = await User.create({
        name,
        email,
        password: hashedPassword,
        admin,
      });
      res.status(200).json(editor);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server side error occurred' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    password,
    admin,
  } = req.body;
  try {
    const editor = await User.update(
      {
        name,
        email,
        password,
        admin,
      },
      { where: { id }, returning: true },
    );
    return res.status(200).json(editor[1][0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { id } });
    res.status(200).json(Number(id));
  } catch (error) {
    res.status(500).json({ error: 'Server side error occurred' });
  }
});
module.exports = router;
