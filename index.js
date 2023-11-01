const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser,userLeaves,getRoomUsers } = require("./utils/users");
const PORT = 3000 || process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// setting static folder
app.use(express.static(path.join(__dirname, "public")));
 const botname = "Linkup Bot ";
// runs when client connects



io.on("connection", (socket) => {


  socket.on("join-room", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
   
    //weclomeing
    socket.emit(
      "welcome",
      formatMessage(botname, "Welcome to the Link up App")
    );
    // broadcast when a usser connects
    socket.broadcast.to(user.room).emit("add", formatMessage(botname, `${user.username} has joined`));
    io.to(user.room).emit("userroomdata" , {room:user.room , list:getRoomUsers(user.room)});
  });





  // when user is leaving
  socket.on("disconnect", () => {
    const user = userLeaves(socket.id);
    
    if(user){
        io.to(user.room).emit("left", formatMessage(botname, `${user.username} has left the chat`));
        io.to(user.room).emit("userroomdata" , {room:user.room , list:getRoomUsers(user.room)});
    }
    
  });




  // listen for chat message
  socket.on("chatMessage", (msg) => {
    const user =getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });
});

server.listen(PORT, () => {
  console.log("running");
});
