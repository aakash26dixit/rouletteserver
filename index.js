// const express = require('express');
// const app = express();
// const http = require('http');
// const { Server } = require("socket.io")
// const cors = require("cors")
// const server = http.createServer(app);

// app.use(cors());

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ['GET', 'POST'],
//   },
// });

// io.on("connection", (socket) => {

//   var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

//   const interval = setInterval(() => {
//     io.emit("data", {number: a[a.length - 1]})
//     a.pop() 
//   }, 10000);

//   const connectedSocketsCount = io.sockets.sockets.size;
//   console.log(`Currently connected sockets: ${connectedSocketsCount}`);

//   socket.on('disconnect', () => {
//     clearInterval(interval);
//   });
// })

// server.listen(3001, () => {
//   console.log("Server is running")
// })
require('dotenv').config()

const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io")
const cors = require("cors")
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: `http://localhost:${process.env.PORT}`,
    methods: ['GET', 'POST'],
  },
});

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
let currentIndex = a.length - 1;
let interval;

function startSendingData() {
  interval = setInterval(() => {
    if (currentIndex >= 0) {
      const currentValue = a[currentIndex];
      io.emit("data", { number: currentValue });
      currentIndex--;
    } else {
      clearInterval(interval);
    }
  }, 15000);
}

io.on("connection", (socket) => {
  const connectedSocketsCount = io.sockets.sockets.size;
  console.log(`Currently connected sockets: ${connectedSocketsCount}`);

  if (currentIndex >= 0 && !interval) {
    startSendingData();
  }

  socket.on('disconnect', () => {
    console.log(`A socket disconnected. Currently connected sockets: ${connectedSocketsCount - 1}`);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server is running");
});

