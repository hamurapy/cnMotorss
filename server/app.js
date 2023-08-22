require('dotenv').config();
const express = require('express');
// const path = require('path');
const cors = require('cors');
const config = require('./config/config');

const app = express();

const authRoute = require('./routes/auth.routes');
const usersRoute = require('./routes/users.route');
const carRouter = require('./routes/cars.routes');

config(app);
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/cars', carRouter);

const PORT = process.env.PORT || 4000;

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });

app
  .listen(PORT)
  .on('listening', () => {
    console.log(`Server's listening port ${PORT}`);
  })
  .on('error', (error) => {
    console.log(`Connecting error: ${error.message}`);
  });
