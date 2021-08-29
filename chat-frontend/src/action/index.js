const roomId = (roomid) => {
  return {
    type: "roomid",
    payload: roomid,
  };
};

const roomPassword = (roompassword) => {
  return {
    type: "roompassword",
    payload: roompassword,
  };
};

const username = (username) => {
  return {
    type: "username",
    payload: username,
  };
};


const userId = (userid) => {
  return {
    type: "userid",
    payload: userid,
  };
};

const chatType = (chattype) => {
  return {
    type: "chattype",
    payload: chattype,
  };
};

const cameraOpen = (camerastatus) => {
  return {
    type: "cameraopen",
    payload: camerastatus,
  };
};

const addUser = (userId,userImg) => {
  return {
    type: "adduser",
     userId:userId,
     userImg:userImg
  };
};

const addUserData=(userId,userImg)=>{
  return {
    type: "adduserdata",
    userId: userId,
    userImg: userImg,
  };
}

const deleteUser=(userId)=>{
  return {
    type:"deleteuser",
    userId:userId  }
}
