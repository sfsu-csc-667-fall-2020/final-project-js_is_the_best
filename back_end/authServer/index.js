const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const passport = require("./lib/passport/index");
const morgan = require("morgan");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://host.docker.internal:27017/Team5", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(info => {
    console.log("MongoDB connection successful");
  })
  .catch(err => {
    console.log("MongoDB connection unsuccessful");
  });

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("dev"));

app.post("/auth/register", async (req, res, next) => {
  passport.authenticate("register", async (err, user, info) => {
    try {
      if (err || !user) {
        return res.send({
          success: false,
          error: err
        });
      }
      req.login(user, { session: false }, async error => {
        if (error) return next(error);
        const token = jwt.sign({ user: user }, "secret_jwt_key");
        res.cookie("jwtToken", token, { maxAge: 360000 });
        return res.send({ success: true, user });
      });
    } catch (error) {
      return res.send({ success: false, error: "internal error" });
    }
  })(req, res, next);
});

app.post("/auth/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return res.send({
          success: false,
          error: "missing/incorrect credentials"
        });
      }
      req.login(user, { session: false }, async error => {
        if (error) return res.send({ success: false, error: "internal error" });
        const token = jwt.sign({ user: user }, "secret_jwt_key");
        res.cookie("jwtToken", token, { maxAge: 360000 });
        return res.send({ success: true, user });
      });
    } catch (error) {
      return res.send({ success: false, error: "internal error" });
    }
  })(req, res, next);
});

app.post("/auth/logout", (req, res) => {
  res.clearCookie("jwtToken");
  res.send({ success: true });
});

app.post(
  "/auth/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      res.send({ success: true, user: req.user });
    } else {
      res.send({ success: false });
    }
  }
);

app.listen(port, () => {
  console.log(`server1 started at port ${port}`);
});
