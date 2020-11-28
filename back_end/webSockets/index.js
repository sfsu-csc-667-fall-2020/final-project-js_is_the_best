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
      //todo: broadcast proper message
      // brodcast({ type: "newInquiryMessage" });
      break;
    case "newListing":
      brodcast({ type: "newListing", listing: JSON.parse(message) });
      break;
    case "ImageProcessDone":
      brodcast({ type: "ImageProcessDone", listingId: message });
      break;
    default:
      break;
  }
  // console.log("came here", message);
});

redisClient.subscribe(["newInquiryMessage", "newListing", "ImageProcessDone"]);

wss.on("connection", ws => {
  console.log("client connected");

  ws.on("close", () => {
    console.log("client disconnected");
  });

  ws.on("message", rawData => {
    const data = JSON.parse(rawData);
  });
});
