const db = require("../../data/db-config"); // assuming db-config.js sets up knex

const getAll = () => {
  return db("cars").select("*"); // fetches all cars
};

const getById = (id) => {
  return db("cars").where({ id }).first(); // fetch a car by ID
};

const create = (car) => {
  return db("cars").insert(car).returning("*"); // inserts a new car
};

const findByVin = (vin) => {
  return db("cars").where({ vin }).first(); // checks if VIN exists
};

module.exports = {
  getAll,
  getById,
  create,
  findByVin
};