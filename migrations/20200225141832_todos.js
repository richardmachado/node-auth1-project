exports.up = async function (knex) {
    await knex.schema.createTable('users', (users) => {
      users.increments()
      users.string('username')
        .notNullable()
        .unique()
      users.string('password')
        .notNullable()
        .unique()
    })
  };
  
  exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('users')
  };