const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');

const app = express();

const authRoute = require('./routes/auth.routes');
const usersRoute = require('./routes/users.route');
const carRouter = require('./routes/cars.routes');
const phoneRouter = require('./routes/phone.routes');
const applicationRouter = require('./routes/application.routes');
const telegramBotRouter = require('./routes/telegramBot.routes');
const telegramContactRouter = require('./routes/telegramContact.routes');
const telegramCarRouter = require('./routes/telegramCar.routes');

config(app);
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

app.use(cors(corsOptions));

// Обработка статических ресурсов
app.use(express.static(path.join(__dirname, 'img')));

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/cars', carRouter);
app.use('/api/phone', phoneRouter);
app.use('/api/application', applicationRouter);
app.use('/api/telegramBot', telegramBotRouter);
app.use('/api/telegramBotContact', telegramContactRouter);
app.use('/api/telegramBotCar', telegramCarRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server's listening on port ${PORT}`);
});
