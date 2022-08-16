const ws = require("ws");

const wss = new ws.Server(
  {
    port: 3001,
  },
  () => console.log("server start")
);

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    message = JSON.parse(message);
    switch (message.event) {
      case "connection":
        const sendMessage = {
          ...message,
          message: "Пользователь, подключился",
        };
        console.log("send");
        broadcostMessage(sendMessage);
        break;
      case "message":
        console.log("sendmess");
        broadcostMessage(message);
        break;
    }
  });
});

const broadcostMessage = (message) => {
  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        ...message,
        new: true,
        id: Date.now(),
        time: Date.now(),
      })
    );
  });
};
