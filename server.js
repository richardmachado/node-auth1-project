const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const morgan = require("morgan")
const authRouter = require("./auth/auth-router.js")
const usersRouter = require("./users/users-router.js")

const server = express()

server.use(helmet())
server.use(cors())
server.use(morgan('dev'))
server.use(express.json())

server.use("/api/auth", authRouter)
server.use("/users", usersRouter)

server.get("/", (req, res, next) => {
  res.json({
    message: "Node I Project",
  })
})

server.use((err, req, res, next) => {
  console.log('Error:', err)
  res.status(500).json({
    message: 'Something went wrong...'
  })
});

module.exports = server