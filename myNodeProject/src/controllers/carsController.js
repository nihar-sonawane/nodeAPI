const Car = require("../models/carsModel");
const User = require("../models/usersModel");

module.exports = {
  index: async (req, res, next) => {
    //get all cars
    const cars = await Car.find({});
    res.status(200).json(cars);
  },

  //will have seller in body
  newCar: async (req, res, next) => {
    //find actual seller
    const seller = await User.findById(req.body.seller);
    //create car
    const newCar = req.body;
    delete newCar.seller;

    const car = new Car(newCar);

    car.seller = seller;

    await car.save();
    //add newly created car to the actual seller
    seller.cars.push(car);
    await seller.save();

    //done
    res.status(201).json(car);
  },

  getCar: async (req, res, next) => {
    const car = await Car.findById(req.params.carsId);
    res.status(200).json(car);
  },

  replaceCar: async (req, res, next) => {
    const carsId = req.params.carsId;
    const newCar = req.body;
    console.log("carsid body=>", carsId, newCar);

    const result = await Car.findByIdAndUpdate(carsId, newCar);
    res.status(200).json({ succes: true, message: result });
  },

  updateCar: async (req, res, next) => {
    const carsId = req.params.carsId;
    const newCar = req.body;
    console.log("carsid body=>", carsId, newCar);

    const result = await Car.findByIdAndUpdate(carsId, newCar);
    res.status(200).json({ succes: true, message: result });
  },

  deleteCar: async (req, res, next) => {
    //get a car
    const carsId = req.params.carsId;
    const car = await Car.findById(carsId);
    if (!car) {
      return res.status(404).json({ error: "cars does not exist" });
      //if no "return", error in console, because it runs the whole rremaing
    }
    //get a seller
    const sellerId = car.seller;
    const seller = await User.findById(sellerId);
    //remove the car
    await car.remove();
    //remove car from seller's selling list
    seller.cars.pull(car);
    await seller.save();
    res.status(200).json({ succes: true, message: "removed" });
  },
};
