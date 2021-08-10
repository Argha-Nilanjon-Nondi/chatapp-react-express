const { createHash } = require("crypto");

class Helper {
  constructor() {
    this.users = {};
    this.userWithRoom={};
  }

  userIdToRoom(userId){
    if(userId in this.userWithRoom){
      return this.userWithRoom[userId];
    }
    return "";
  }

  createRoom(roomId) {
    if (!(roomId in this.users)) {
      let roomPasswordText = Math.random().toString();
      let roomPasswordHash = createHash("sha256")
        .update(roomPasswordText)
        .digest("hex");
      this.users[roomId] = { member: [], roomPassword: roomPasswordHash };
      return roomPasswordHash;
    }
    return false;
  }

  deleteRoom(roomId, roomPassword) {
    if (roomId in this.users) {
      if (this.users[roomId].roomPassword === roomPassword) {
        delete this.users[roomId];
        return true;
      }
    }
    return false;
  }

  joinUser(roomId,userId, username) {
    if (roomId in this.users) {
      const singleUser = {
        userId: userId,
        userName: username
      };
      this.users[roomId].member.push(singleUser);
      this.userWithRoom[userId]=roomId
      return true;
    }
    return false;
  }

  getSingleUser(roomId, userId) {
    if (roomId in this.users) {
      return this.users[roomId].member.find((p_user) => p_user.userId === userId);
    }
    return false;
  }

  deleteUser(roomId, userId) {
      if(roomId in this.users){
    
    this.users = this.users[roomId].member.filter((value) => {
      return value.userId != userId;
    });
    return true;
      }
      return false;
  }
}

// const helper = new Helper();
// console.log(helper.createRoom("Argha"));
// console.log(helper.createRoom("Rahul"));
// console.log(helper.users);
// console.log(helper.deleteRoom("Argha", helper.users["Argha"].roomPassword));
// console.log(helper.users);
// console.log(helper.joinUser("Rahul","08976877","AAAA"))
// console.log(helper.users);
// console.log(helper.getSingleUser("Rahul","08976877"))
// console.log(helper.deleteUser("Rahul", "08976877"));
// console.log(helper.users);
module.exports = Helper;
