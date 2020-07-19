const User = require("../models/usersModel");
// const { Error } = require("mongoose");
const Cars = require("../models/carsModel");
const Car = require("../models/carsModel");

module.exports = {
  index: async (req, res, next) => {
    // try {
    const users = await User.find({}).populate("cars","make");
    res.status(200).json(users);
    // } catch (err) {
    //   next(err);
    // }
  },

  newUser: async (req, res, next) => {
    // try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
    // } catch (err) {
    //   console.log(err);
    //   next(err);
    // }
  },

  getUser: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("cars");
    res.status(200).json(user);
  },

  replaceUser: async (req, res, next) => {
    //enforce that req.body must contain all the fields
    const { userId } = req.params;
    const newUser = req.body;
    //pass id, and new object which overwrite the existing one fpounf by that id
    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ succes: true, message: result });
  },

  updateUser: async (req, res, next) => {
    //req.body may contain any number of fields
    const { userId } = req.params;
    const newUser = req.body;
    //provide any one field or combination
    const result = await User.findByIdAndUpdate(userId, newUser);
    res.status(200).json({ succes: true, message: result });
  },

  getUserCars: async (req, res, next) => {
    const { userId } = req.params;
    // const user = await User.findById(userId);
    // console.log("user ", user);

    //to show  user's car
    const user = await User.findById(userId).populate("cars");
    console.log("user ", user);
    res.status(200).json(user.cars);
  },

  newUserCar: async (req, res, next) => {
    const { userId } = req.params;
    // create a new car
    const newCar = new Car(req.body);
    // console.log("Cars=> ", newCar);
    //getUser
    const user = await User.findById(userId);
    //assign user as a car's seller
    newCar.seller = user;
    //save the car
    await newCar.save();
    //add car to the user's selling array "cars"
    user.cars.push(newCar);
    //save the user
    await user.save();
    res.status(201).json(newCar);
  },
};

/*
User.findById(userId)
returns promise 
=> which we can resolve using an error or values
so await it
=> await User.findById(userId)
it eventually want the promise resolves, return user in case it exists
=> const user= await User.findById(userId)

*/

/* IMPORTANT
We can interact with mongoose in 3 different ways
1. Callbacks
---- User.find({},(err,users)=>{
    })


2. Promises
we dont know how long it will take, but after its done then lets do something
  index: (req, res, next) => {
    //promise GET
    User.find({}).then((users) => {
      //do something with users
      res.status(200).json(users);
    }).catch(err=>{
      next(err)
    })
  },

  //newUser
    newUser: (req, res, next) => {
    const newUser = new User(req.body);
    newUser
      .save()
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        next(err);
      });
  },


3. Async/Await
(with this we use try catch method)
  index: async (req, res, next) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  },

//newUser
  newUser: async (req, res, next) => {
    try {
      const newUser = new User(req.body);
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

*/

/*
BASIC GET
module.exports = {
  index: (req, res, next) => {
    res.status(200).json({
      message: "Requested GET",
    });
  },
};
*/
