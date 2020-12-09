const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const port = 5000;

const apiProxy = httpProxy.createProxyServer();

apiProxy.on("error", (error, req, res) => {
  res.send({ success: false, error: "proxy error" });
});

app.all("/auth*", (req, res) => {
  const options = { target: "http://localhost:5001" };
  apiProxy.web(req, res, options);
});

app.all("/inquiry*", (req, res) => {
  const options = { target: "http://localhost:5002" };
  apiProxy.web(req, res, options);
});
app.all("/listing*", (req, res) => {
  const options = { target: "http://localhost:5003" };
  apiProxy.web(req, res, options);
});

app.get("*", (req, res) => {
  const options = { target: "http://localhost:4000" };
  apiProxy.web(req, res, options);
});

// websockets are not hosted by the gateay, they are connected directly at ws://localhost:5000
// https://www.websocket.org/echo.html - for testing websocket routes
app.listen(port, () => {
  console.log("server1 started at port 5000");
});
