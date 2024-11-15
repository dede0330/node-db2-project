const carsModel = require("./cars-model");

const checkCarId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await carsModel.getById(id); // Use the model to check if the car exists

    if (!car) {
      return res.status(404).json({ message: `Car with id ${id} not found` });
    }

    req.car = car; // Attach the found car to req.car for use in later middleware or routes
    next();
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve car" });
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;

  if (!vin) {
    return res.status(400).json({ message: "vin is missing" });
  }

  if (!make) {
    return res.status(400).json({ message: "make is missing" });
  }

  if (!model) {
    return res.status(400).json({ message: "model is missing" });
  }

  if (!mileage) {
    return res.status(400).json({ message: "mileage is missing" });
  }

  next(); // All required fields are present, proceed to the next middleware or route handler
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;

  // Regular expression to validate a VIN (17 characters, no I, O, or Q)
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;

  if (!vin || !vinRegex.test(vin)) {
    return res.status(400).json({ message: `vin ${vin} is invalid` });
  }

  next(); // VIN is valid, proceed to the next middleware or route handler
};

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;

  try {
    const existingCar = await carsModel.findByVin(vin);

    if (existingCar) {
      return res.status(400).json({ message: `vin ${vin} already exists` });
    }

    next(); // VIN is unique, proceed to the next middleware or route handler
  } catch (error) {
    res.status(500).json({ message: "Failed to check VIN uniqueness" });
  }
};

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique };