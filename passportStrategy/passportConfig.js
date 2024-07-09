const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../models/userModel");
require("dotenv").config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};

// passport.use(
//   "local-signup",
//   new LocalStrategy(
//     {
//       usernameField: "username",
//       passwordField: "password",
//       passReqToCallback: true,
//     },
//     async (req, username, password, done) => {
//       try {
//         const userExists = await User.findOne({ username });
//         if (userExists) {
//           return done(null, false, { message: "Username already taken" });
//         }
//         const newUser = new User({ username, password });
//         await newUser.save();
//         return done(null, newUser);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// passport.use(
//   "local-login",
//   new LocalStrategy(
//     {
//       usernameField: "username",
//       passwordField: "password",
//     },
//     async (username, password, done) => {
//       try {
//         const user = await User.findOne({ username });
//         if (!user) {
//           return done(null, false, { message: "Incorrect username" });
//         }
//         const isMatch = await user.matchPassword(password);
//         if (!isMatch) {
//           return done(null, false, { message: "Incorrect password" });
//         }
//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// //transforms a user object into a compact piece of data (usually the ID) for session storage.
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // retrieves the complete user object back from the database when needed using the serialized data (ID).
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// module.exports = passport;
