import { bindActionCreators } from "redux";
import { io } from "socket.io-client";
export const roomId = (roomid) => {
  return {
    type: "roomid",
    payload: roomid,
  };
};

export const roomPassword = (roompassword) => {
  return {
    type: "roompassword",
    payload: roompassword,
  };
};

export const userName = (username) => {
  return {
    type: "username",
    payload: username,
  };
};

export const userId = (userid) => {
  return {
    type: "userid",
    payload: userid,
  };
};

export const chatType = (chattype) => {
  return {
    type: "chattype",
    payload: chattype,
  };
};

export const cameraOpen = (status) => {
  return {
    type: "cameraopen",
    payload: status,
  };
};

export const videoOpen = (status) => {
  return {
    type: "videoopen",
    payload: status,
  };
};

export const addUserData = (userId, userName, userImg) => {
  return {
    type: "adduser",
    userId: userId,
    userImg: userImg,
    userName: userName,
  };
};


export const deleteUser = (userId) => {
  return {
    type: "deleteuser",
    userId: userId,
  };
};

export const setStepStatus = (status) => {
  return {
    type: "stepstatus",
    payload: status,
  };
};

export const socket = () => {
  return {
    type: "socket"
  };
};

export const ownUserData = (imgdata) => {
  return {
    type: "ownuserdata",
    imgdata: imgdata,
  };
};

export const endMeeding=()=>{
  return {
    type:"end"
  }
}
