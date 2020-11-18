const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const passport = require("../lib/passport/index");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.post("/auth/register", async (req, res, next) => {
  passport.authenticate("register", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");
        return next(error);
      }
      req.login(user, { session: false }, async error => {
        if (error) return next(error);
        const token = jwt.sign({ _id: user._id }, "secret_jwt_key");
        res.cookie("jwtToken", token, { maxAge: 360000 });
        return res.send(user);
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

app.post("/auth/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");
        return next(error);
      }
      req.login(user, { session: false }, async error => {
        if (error) return next(error);
        const token = jwt.sign({ _id: user._id }, "secret_jwt_key");
        res.cookie("jwtToken", token, { maxAge: 360000 });
        return res.send(user);
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

app.post("/auth/logout", (req, res) => {
  res.send("hello from /auth/logout");
});

app.get("/auth/user", (req, res) => {
  res.send("hello from /auth/user");
});

app.listen(port, () => {
  console.log(`server1 started at port ${port}`);
});
