const bcrypt = require('bcryptjs');
const express = require('express');
const Users = require('../users/users-model');

const router = express.Router()

router.post('/register', async (req, res, next) => {
  try {
    const registered = await Users.add(req.body)

    res.status(201).json(registered)
  } catch (err) {
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await Users.findBy({ username }).first()
    const passwordValid = await bcrypt.compare(password, user.password)

    if (user && passwordValid) {
      res.status(200).json({
        message: `${user.username} logged in`
      })
    } else {
      res.status(401).json({
        message: 'You shall not pass!'
      })
    }
  } catch (err) {
    next(err)
  };
});

module.exports = router