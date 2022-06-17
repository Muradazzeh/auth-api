'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('./models');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')
const permissions = require('./middleware/acl.js')

authRouter.get("/",(req,res)=>{
  res.status(200).send("YOU ARE ONLY HERE FOR SHORT VISIT DON'T HURRY , DON'T WORRY AND BE SURE TO SEE SOME MAGIC ")
})
authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      username: userRecord.username,
      password:userRecord.password,
      // token: userRecord.token,
      role:userRecord.role,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});


authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});
authRouter.get('/allUsers', async (req, res, next) => {
  const userRecords = await users.findAll({});
  res.status(200).json(userRecords);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area')
});

module.exports = authRouter;
