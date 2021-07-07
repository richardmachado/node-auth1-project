const express = require('express');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session)

const middleware = require('./api/mware')

const apiRouter = require('./api/apiRouter');

const knex = require('./data/dbconfig')

const server = express();

server.use(
  session({
    name: process.env.SESSION_NAME ||'LoginApp',
    secret: process.env.SESSION_SECRET || '$2y$08$4RFEtq2KMkGFMD.BFpj17uHr9Tmb1Jl5eYLURaUQHfqWyhlvbCcSi',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 30,
      secure: false,
      httpOnly: true,
    },
    store: new KnexStore({
      knex,
      tablename: "sessionStore",
      createTable: true,
      sidfieldname: "sid",
      clearInterval: 1000 * 60 * 45,
    }),
  })
);
middleware(server)

server.use ('/api', apiRouter)

server.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(err => {
      if(err){
        res.status(500).json({message: 'There was an error logging you out.'})
      } else{
        res.status(200).json({message: 'See you next time!'})
      }
    });
  } else {
    res.status(200).json({message: 'You were never here'})
  }
})



module.exports = server