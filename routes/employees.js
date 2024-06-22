const express = require("express");
const {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} = require("../controllers/employeeController");
const router = express.Router();

// GET all employees
router.get("/", getEmployees);

// GET a single employee by ID
router.get("/:id", getEmployee);

// POST a new employee
router.post("/", createEmployee);

// PATCH (update) an employee by ID
router.patch("/:id", updateEmployee);

// DELETE an employee by ID
router.delete("/:id", deleteEmployee);

module.exports = router;
