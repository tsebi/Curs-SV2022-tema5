const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const port = 3000;
const server = http.createServer(app);
const io = new Server(server);

function randomRGB() {
  const r = () => (Math.random() * 256) >> 0;
  return `rgb(${r()}, ${r()}, ${r()})`;
}
const arrayOfAnswers = [];

function newAnswer(element) {
  this.brand = element;
  this.id = Date.now();
  this.count = 1;
  this.color = randomRGB();
}

function sorting(answer) {
  if (arrayOfAnswers.some((item) => item.brand === answer)) {
    for (let obj of arrayOfAnswers) {
      if (obj.brand === answer) {
        obj.count += 1;
      }
    }
  } else {
    let itemtoadd = new newAnswer(answer);
    arrayOfAnswers.push(itemtoadd);
    console.table(arrayOfAnswers);
    return arrayOfAnswers;
  }
}
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

io.on("connection", (socket) => {
  io.emit("updated-poll", arrayOfAnswers);
  console.log(`[SOCKET CONNECTED] ${socket.id}`);

  socket.emit("connected");

  socket.on("answer", (answer) => {
    console.log("marca primita este: " + answer);
    sorting(answer);
    io.emit("updated-poll", arrayOfAnswers);
  });
});
