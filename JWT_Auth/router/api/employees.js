const express = require("express");
const router = express.Router();
const employeeControllers = require("../../controllers/employeesController");

router
  .route("/")
  .get(employeeControllers.getEmployees)
  .post(employeeControllers.postEmployees)
  .put(employeeControllers.putEmployees)
  .delete(employeeControllers.deleteEmployees);

router.route("/:id").get(employeeControllers.getEmployee);

module.exports = router;
