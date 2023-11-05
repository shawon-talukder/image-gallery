/* eslint-disable no-console */
// dependencies
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

// internal dependencies
const imageRouter = require('./routes/imageRouter');

// model scaffolding
const app = express();

// configuration
dotenv.config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));

// routes
app.use('/api/v1/image', imageRouter);

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => { console.log('database connected successfully!'); })
  .catch((err) => { console.log('database connection failed!', err); });

// server port
app.listen(port, () => {
  console.log(`app listening on port: http://localhost:${port}`);
});
