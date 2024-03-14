require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const employeeRoutes = require("./routes/employees");
const app = express();

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());
app.use("/api/employees", employeeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
