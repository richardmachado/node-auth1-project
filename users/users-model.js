const db = require('../data/dbconfig');

module.exports = {
add,
find,
findByID,
findBy
}


function findBy(filter) {
  return db("users")
    .select("id", "username", "password")
    .where(filter);
}

function findByID(id) {
  return db('users')
    .where({id})
    .first()
}

function add(user) {
  return db('users')
    .insert(user, "id")
    .then(ids => {
      const [id] = ids
      return findByID(id)
    })
}

function find(){
  return db('users')
    .select('id', 'username', 'password');
}

