const express = require("express");
const cors = require('cors')
const httpProxy = require("http-proxy");

const app = express();
const port = 5000;

const apiProxy = httpProxy.createProxyServer();

app.use(cors())

apiProxy.on("error", (error, req, res) => {
  res.send({ success: false, error: error });
});

app.all("/auth*", (req, res) => {
  const options = { target: "http://auth:5001" };
  apiProxy.web(req, res, options);
});

app.all("/inquiry*", (req, res) => {
  const options = { target: "http://inquiry:5002" };
  apiProxy.web(req, res, options);
});
app.all("/listing*", (req, res) => {
  const options = { target: "http://listing:5003" };
  apiProxy.web(req, res, options);
});

app.get("*", (req, res) => {
  const options = { target: "http://frontend:4000" };
  apiProxy.web(req, res, options);
});

// websockets are not hosted by the gateay, they are connected directly at ws://localhost:5000
// https://www.websocket.org/echo.html - for testing websocket routes
app.listen(port, () => {
  console.log("server1 started at port 5000");
});
