const { createHash } = require("crypto");

class Helper {
  constructor() {
    this.users = {};
    this.userWithRoom={};
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
