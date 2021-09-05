const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const Chat = require("./Routes/Chat");
const Lib = require("./Lib/index");

const helper = new Lib();

const app = express();
const port = 8000;

app.use(express());
app.use(cors());
app.use("/chat", Chat);

const webSocket = app.listen(port, () => {
    console.log(`Chat is running on http://localhost:${port}/`);
});

const io = socketio(webSocket);

io.on("connection", (socket) => {
    //join in a chat
    socket.on("join-chat", (data) => {
        if (data.roomId === undefined || data.username == undefined) {
            socket.emit("join-chat", {
                code: "3000",
                message: "Required field is not found",
            });
        } else if (data.roomId === "" || data.username == "") {
            socket.emit("join-chat", {
                code: "3001",
                message: "Required field is empty",
            });
        } else if (
            data.roomId !== undefined &&
            data.username !== undefined &&
            data.roomId !== "" &&
            data.username != ""
        ) {
            const username = data.username;
            const room = data.roomId;
            let joinStatus = helper.joinUser(room, socket.id, username);
            if (joinStatus === true) {
                socket.join(room);
                //Send acknowledge message to the user
                io.to(socket.id).emit("join-chat", {
                    userId: socket.id,
                    username: `@${username}`,
                    code: "2000",
                    message: `Welcome ${username}`,
                });

                //send users list to the new members
                io.to(socket.id).emit("chat", {
                    userList: helper.users[room].member,
                    code: "2004",
                });

                //Send acknowledge message to all user
                io.to(room).emit("chat", {
                    userId: socket.id,
                    username: username,
                    code: "2002",
                    message: `@${username} is added`,
                });
            }

            if (joinStatus === false) {
                //Send acknowledge message to the user
                io.to(socket.id).emit("join-chat", {
                    userId: socket.id,
                    code: "3002",
                    message: `Room ID is not valid`,
                });
            }
        }
    });

    //create a chat room
    socket.on("create-chat", (data) => {
        if (data.roomId === undefined || data.username == undefined) {
            socket.emit("create-chat", {
                code: "3000",
                message: "Required field is not found",
            });
        } else if (data.roomId === "" || data.username == "") {
            socket.emit("create-chat", {
                code: "3001",
                message: "Required field is empty",
            });
        } else if (
            data.roomId !== undefined &&
            data.username !== undefined &&
            data.roomId !== "" &&
            data.username != ""
        ) {
            const username = data.username;
            const room = data.roomId;
            socket.join(room);
            console.log(room);
            let createStatus = helper.createRoom(room);

            if (createStatus != false) {
                //Send acknowledge message to the user
                io.to(socket.id).emit("create-chat", {
                    userId: socket.id,
                    roomPassword: createStatus,
                    username: `@${username}`,
                    code: "2001",
                    message: `Chat room is created`,
                });

                let joinStatus = helper.joinUser(room, socket.id, username);

                if (joinStatus === true) {
                    //Send acknowledge message to the user
                    io.to(socket.id).emit("create-chat", {
                        userId: socket.id,
                        username: `@${username}`,
                        code: "2000",
                        message: `Welcome ${username}`,
                    });

                    //send users list to the new members
                    io.to(socket.id).emit("chat", {
                        userList: helper.users[room].member,
                        code: "2004",
                    });
                }

                if (joinStatus === false) {
                    //Send acknowledge message to the user
                    io.to(socket.id).emit("create-chat", {
                        userId: socket.id,
                        code: "3002",
                        message: `Room ID is not valid`,
                    });
                }
            }

            if (createStatus === false) {
                //Send acknowledge message to the user
                io.to(socket.id).emit("create-chat", {
                    userId: socket.id,
                    username: `@${username}`,
                    code: "3003",
                    message: `Room Id is already exist`,
                });
            }
        }
    });

    //listen to chat event
    socket.on("chat", (data) => {
        //2003
        let room = helper.userIdToRoom(socket.id);
        let senderUserId = socket.id;
        let senderImg = data.img;
        let username = helper.getSingleUser(room, senderUserId).userName;

        io.to(room).emit("chat", {
            userName: username,
            userId: senderUserId,
            code: "2003",
            img: senderImg,
        });
    });

    //if a user disconnect
    socket.on("disconnect", (data) => {
        //throw to all users in the room id
        senderUserId = socket.id;
        let senderRoomId = helper.userIdToRoom(senderUserId);
        io.to(senderRoomId).emit("chat", {
            userId: senderUserId,
            code: "2005",
        });
        console.log(`${senderUserId} is disconnected`);
    });
    //if host end up meeting
    socket.on("end-meeting", (data) => {
        //throw to all users in the room id
        let senderUserId = socket.id;
        let senderRoomPassword = data.roomPassword;
        let senderRoomId = helper.userIdToRoom(senderUserId);
        if (senderRoomPassword && senderRoomPassword != "") {
            helper.deleteRoom(senderRoomId, senderRoomPassword);
            io.to(senderRoomId).emit("chat", {
                code: "2006",
            });
            console.log(`${senderUserId} is meeting is ended`);
        }
    });

    //if a user end up meeting
    socket.on("leave-meeting", (data) => {
        //throw to all users in the room id
        let senderUserId = socket.id;
        let senderRoomId = helper.userIdToRoom(senderUserId);
        io.to(senderRoomId).emit("chat", {
            userId: senderUserId,
            code: "2005",
        });
    });
});