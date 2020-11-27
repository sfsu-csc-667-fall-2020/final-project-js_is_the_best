const WebSocket = require("ws");
const redis = require("redis");
const redisClient = redis.createClient();

const wss = new WebSocket.Server({ port: 5000 });

const brodcast = data => {
  const sendData = JSON.stringify(data);
  wss.clients.forEach(client => {
    client.send(sendData);
  });
};

redisClient.on("message", (channel, message) => {
  switch (channel) {
    case "newInquiryMessage":
      break;
    default:
      break;
  }
  // console.log("came here", message);
});

redisClient.subscribe(["newInquiryMessage"]);

wss.on("connection", ws => {
  console.log("client connected");

  ws.on("close", () => {
    console.log("client disconnected");
  });

  ws.on("message", rawData => {
    const data = JSON.parse(rawData);
  });
});
