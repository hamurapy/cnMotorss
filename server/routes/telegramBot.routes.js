const router = require('express').Router();
const TelegramBot = require('node-telegram-bot-api');
const { EOL } = require('os');

router.post('/', async (req, res) => {
  try {
    const {
      name, email, phone,
    } = req.body;
    if (name && email && phone) {
      const bot = new TelegramBot('6328390230:AAFWXVDHLrzRCNl4d5UHVTuGJTlZW_8P27c', {
        polling: true,
      });
      if (name && email && phone) {
        await bot.sendMessage(
          -905522359,
          `Имя: ${name}${EOL}Email: ${email}${EOL}Телефон: ${phone}${EOL}`,
        );
      } else {
        res.status(400).json({ message: 'Не все поля заполнены' });
        return;
      }
      await bot.stopPolling();
      res.json({ message: 'good' });
    } else {
      res.status(400).json({ message: 'Введите все данные' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
