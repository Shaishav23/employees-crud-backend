const express = require("express");
const Employee = require("../models/employeeModel");
const {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} = require("../controllers/employeeController");
const router = express.Router();

router.get("/", getEmployees);

router.get("/:id", getEmployee);

router.post("/", createEmployee);

router.patch("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;
