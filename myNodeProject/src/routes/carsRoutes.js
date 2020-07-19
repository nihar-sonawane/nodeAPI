const router = require("express-promise-router")();

const CarsController = require("../controllers/carsController");
const carsController = require("../controllers/carsController");
const usersController = require("../controllers/usersController");

router.route("/").get(CarsController.index).post(CarsController.newCar);

router
  .route("/:carsId")
  .get(carsController.getCar)
  .put(carsController.replaceCar)
  .patch(carsController.updateCar)
  .delete(carsController.deleteCar)

module.exports = router;
