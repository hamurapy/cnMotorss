const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/user', async (req, res) => {
  try {
    if (req.session.userId) {
      const user = await User.findOne({ where: { id: req.session.userId }, attributes: { exclude: ['password'] } });
      res.json(user);
    }
  } catch ({ message }) {
    res.json(message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      let user = await User.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.password))) {
        if (user.admin) {
          user = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: true,
          };
        } else {
          user = {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }
        req.session.userId = user.id;
        req.app.locals.user = user;
        res.status(201).json(user);
      } else {
        res.status(403).json({ message: 'Неверный email или пароль' });
      }
    } else {
      res.status(403).json({ message: 'Заполните все поля' });
    }
  } catch ({ message }) {
    res.status(500).json(message);
  }
});

// router.post('/registration', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (email && password) {
//       let user = await User.findOne({ where: { email } });

//       if (!user) {
//         const hashedPassword = await bcrypt.hash(
//           password,
//           Number(process.env.SALT_ROUNDS) || 11,
//         );

//         const newUser = await User.create({
//           email,
//           password: hashedPassword,
//         });
//         user = {
//           id: newUser.id,
//           email: newUser.email,
//         };
//         req.session.userId = user.id;
//         res.status(201).json({ user });
//       } else {
//         res.status(403).json({ error: 'Такой email уже существует' });
//       }
//     } else {
//       res.status(403).json({ error: 'Заполните все поля' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.delete('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  res.json({ message: 'success', user: {} });
});

module.exports = router;
