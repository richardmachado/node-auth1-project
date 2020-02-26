const bcrypt = require('bcryptjs')
const router = require("express").Router();

const userRouter = require("../users/userRouter.js");

const Users = require("../users/users-model.js");
const restricted = require("../auth/restricted.js");

router.use("/users", restricted, userRouter);

router.get("/", (req, res) => {
  res.send('<h1>Node Auth Project</h1>');
});

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error.message);

      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {

        req.session.loggedIn = true;
        req.session.userName = user.username;

        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});



module.exports = router;
