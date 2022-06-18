'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('../src/auth/error-handlers/500');
const notFound = require('../src/auth/error-handlers/404');
const authRoutes = require('./auth/routes.js');
const v1Routes = require('./auth/v1Routes');
const v2Routes=require("./auth/v2Routes")
// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`ALWAYS KEEP YOUR EYES OPEN ON PORT ${port}`);
    });
  },
};
