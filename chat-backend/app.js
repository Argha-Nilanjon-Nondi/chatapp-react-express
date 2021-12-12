const express = require("express");
const cors = require("cors");

const app = express();
const server=require("http").Server(app)
const io = require("socket.io")(server,{
  cors:{
    origin:"*"
  }
});

const { ExpressPeerServer } = require("peer");
const peerServer=ExpressPeerServer(server,{debug:true})

app.use(express());
// app.use(cors({origin:"*"}));
app.use("/chat", peerServer);

const userList = {};

io.on("connection", (socket) => {
  socket.on("username_submit", (data) => {
      
    if (data.username in userList) {
      socket.emit("username_submit", { code: "3000" });
    } else {
      userList[data.username] = socket.id;
      socket.emit("username_submit", { code: "2000" });
    }
  });

  socket.on("call_user", (data) => {
    let my_username=data.my_username;
    let other_username = data.other_username;
    if(other_username in userList){
      socket.emit("call_user",{code:"2001",other_username:other_username})
      io.to(userList[other_username]).emit("call_user",{code:"2002",my_username:other_username,other_username:my_username})
    }
    if(!(other_username in userList)){
      socket.emit("call_user",{code:"3001"})
    }
		
	});

  socket.on("call_accept",(data)=>{
    console.log(data)
    io.to(userList[data.other_username]).emit("call_accept",{})
  })

 socket.on("call_end", (data) => {
   io.to(userList[data.other_username]).emit("call_end", {});
 });
 socket.on("call_reject", (data) => {
   io.to(userList[data.other_username]).emit("call_reject", {});
 });
  socket.on("disconnect",(data)=>{
const key = Object.keys(userList).find((key) => userList[key] === socket.id);
delete userList[key]
  })
});

const port = 8000;
server.listen(port, () => console.log("App is listening on port", port));
