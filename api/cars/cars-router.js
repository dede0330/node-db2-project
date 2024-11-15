const express = require("express");
const carsModel = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
} = require("./cars-middleware");

const router = express.Router();

// [GET] /api/cars - Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await carsModel.getAll();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve cars" });
  }
});

// [GET] /api/cars/:id - Get car by ID
router.get("/:id", checkCarId, async (req, res) => {
  res.status(200).json(req.car);
});

// [POST] /api/cars - Create a new car
router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res) => {
    try {
      const [newCar] = await carsModel.create(req.body);
      res.status(201).json(newCar);
    } catch (error) {
      res.status(500).json({ message: "Failed to create car" });
    }
  }
);

module.exports = router;