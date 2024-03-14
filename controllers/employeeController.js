const Employee = require("../models/employeeModel");
const mongoose = require("mongoose");

//get all employees
const getEmployees = async (req, res) => {
  const employees = await Employee.find({}).sort({ name: 1 });
  res.status(200).json(employees);
};

//get a single employee
const getEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such employee" });
  }

  const employee = await Employee.findById(id);

  if (!employee) {
    return res.status(404).json({ error: "No such employee" });
  }
  res.status(200).json(employee);
};

//Create a new Employee
const createEmployee = async (req, res) => {
  const {
    name,
    email,
    phone,
    position,
    company,
    department,
    salary,
    hireDate,
    isActive,
  } = req.body;

  //add to database
  try {
    const employee = await Employee.create({
      name,
      email,
      phone,
      position,
      company,
      department,
      salary,
      hireDate,
      isActive,
    });
    res.status(200).json(employee);
  } catch {
    res.status(400).json({ error: error.message });
  }
};

//delete a employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such employee" });
  }

  const employee = await Employee.findByIdAndDelete({ _id: id });

  if (!employee) {
    return res.status(404).json({ error: "No such employee" });
  }
  res.status(200).json(employee);
};

//update a employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such employee" });
  }

  const employee = await Employee.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!employee) {
    return res.status(404).json({ error: "No such employee" });
  }
  res.status(200).json(employee);
};

module.exports = {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
};
