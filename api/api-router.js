const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const restrcited = require('../auth/restricted-middleware');

router.use('/auth', authRouter);
router.use('/users', restrcited, usersRouter);

module.exports = router;