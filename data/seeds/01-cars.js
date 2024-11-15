// STRETCH
exports.seed = function (knex) {
    
    return knex("cars")
      .del()
      .then(function () {
        //Inserts seed entries
        return knex("cars").insert([
          {
            vin: "1HGCM82633A123456",
            make: "Honda",
            model: "Accord",
            mileage: 120000,
            title: "clean",
            transmission: "automatic",
          },
          {
            vin: "1FAFP404XYF123456",
            make: "Ford",
            model: "Mustang",
            mileage: 90000,
            title: "salvage",
            transmission: "manual",
          },
          {
            vin: "1C4RJFBG3EC123456",
            make: "Jeep",
            model: "Grand Cherokee",
            mileage: 75000,
            title: "clean",
            transmission: "automatic",
          },
        ]);
      });
  };