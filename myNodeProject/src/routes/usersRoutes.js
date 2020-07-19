const express = require("express");
// const router = express.Router();

const router = require("express-promise-router")();

//example - same thing
// router.route("/").get().post()
// router.get("/", (req, res, next) => {});

const usersController = require("../controllers/usersController");


router.route("/").get(usersController.index).post(usersController.newUser);

//users/:id
router
  .route("/:userId")
  .get(usersController.getUser)
  .put(usersController.replaceUser) //put requires all the fields it contains, it will simply overwrite it
  .patch(usersController.updateUser); //patch: send any field, any combination of fields, it will update just those
// .delete()

router
  .route("/:userId/cars")
  .get(usersController.getUserCars)
  .post(usersController.newUserCar);

module.exports = router;
