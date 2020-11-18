const passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy;
const localStrategy = require("passport-local").Strategy;

const userModel = require("../../db/models/user").model;

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const reqUser = await userModel.findOne({ email: email }).exec();
        if (!reqUser) {
          return done("user does not exist");
        } else {
          if (reqUser.password === password) {
            return done(null, { ...reqUser, password: null });
          } else {
            return done("incorrect password");
          }
        }
      } catch (error) {
        return done("internal error");
      }
    }
  )
);

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const reqUser = await userModel.findOne({ email: email }).exec();
        if (reqUser) {
          return done("user with this email already exists");
        } else {
          const newUser = new userModel({
            email,
            password,
            name: req.body.name
          });
          await newUser.save();
          return done(null, { ...newUser, password: null });
        }
      } catch (error) {
        return done("internal error");
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: function(req) {
        var token = null;
        if (req && req.cookies) {
          token = req.cookies["jwtToken"];
        }
        return token;
      },
      secretOrKey: "secret_jwt_key"
    },
    function(jwt_payload, done) {
      //   console.log("reached here", jwt_payload.user);
      //   find user form the db using jwt_payload.user
      return done(null, jwt_payload.user);
      // User.findOne({ id: jwt_payload.sub }, function(err, user) {
      //   if (err) {
      //     return done(err, false);
      //   }
      //   if (user) {
      //     return done(null, user);
      //   } else {
      //     return done(null, false);
      //     // or you could create a new account
      //   }
      // });
    }
  )
);

// passport.serializeUser(function(user, done) {
//     // console.log("serializeUser");
//     done(null, { id: user._id, userType: user.userType });
//   });

//   passport.deserializeUser(function(obj, done) {
//     // console.log("deserializeUser");
//     if (obj.userType === 1) {
//       clientUser.findOne(
//         {
//           _id: obj.id
//         },
//         "-password -salt", // not include password and salt in the user object that is returned
//         function(err, user) {
//           done(err, user);
//         }
//       );
//     } else if (obj.userType === 2) {
//       businessAdmUser.findOne(
//         {
//           _id: obj.id
//         },
//         "-password -salt", // not include password and salt in the user object that is returned
//         function(err, user) {
//           done(err, user);
//         }
//       );

//       // business admin profile
//     } else {
//       done("internal error", null);
//     }
//   });
module.exports = passport;
