const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const morgan = require("morgan")
const authRouter = require("./auth/auth-router.js")
const usersRouter = require("./users/users-router.js")
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);
const knex = require('./database/db-config')


const server = express()

const sessionConfig= {
  name:'monsterandvodka',
  secret:"keep it weird",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge:1000 * 60* 10,
    secure: false, // true in production
    httpOnly: true, // true means JS can't touch the cookie
  },
  store: new KnexStore({
    knex,
    tablename: "sessions",
    createtable: true,
    sidfieldname: "sid", //can be named anything
    clearInterval: 1000 * 60 * 15,  
  }),
};

server.use(helmet())
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(session(sessionConfig)); // turn on the session middleware
// at this point there is a req.session object created by express-session


server.use("/api/auth", authRouter)
server.use("/users", usersRouter)

server.get("/", (req, res, next) => {
  res.json({
    message: "Node I Auth and Cookies Project",
  })
})

server.use((err, req, res, next) => {
  console.log('Error:', err)
  res.status(500).json({
    message: 'Something went wrong...'
  })
});

module.exports = server