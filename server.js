require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const employeeRoutes = require("./routes/employees");
const users = require("./routes/authRoutes");
const passport = require("passport");

const app = express();

app.use(cors());
app.use(express.json());

//Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
//Passpoer config
require("./passportStrategy/passportConfig")(passport);

// app.use(passport.initialize());
// app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Database");
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Passport middleware
app.use(passport.initialize());
//Passpoer config
require("./passportStrategy/passportConfig")(passport);

//Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", users);
