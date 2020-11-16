const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5000 });

const brodcast = data => {
  const sendData = JSON.stringify(data);
  wss.clients.forEach(client => {
    client.send(sendData);
  });
};

wss.on("connection", ws => {
  console.log("client connected");

  ws.on("close", () => {
    console.log("client disconnected");
  });

  ws.on("message", rawData => {
    const data = JSON.parse(rawData);
    switch (data.actionType) {
      case "eventA":
        // messages.splice(0, 0, {
        //   userName: data.userName,
        //   message: data.message
        // });
        // brodcast({ messages, actionType: "newMessage" });
        break;
      case "eventB":
        // ws.send(JSON.stringify({ messages, actionType: "newMessage" }));
        break;
      default:
        console.log("unknown type");
        break;
    }
  });
});
