exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars',(table) => {
    table.increments('id').primary();
    table.string('vin').notNullable();
    table.string('make').notNullable();
    table.string('model').notNullable();
    table.float('mileage');
    table.string('title').notNullable();
    table.string('transmission').notNullable();
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars');
};