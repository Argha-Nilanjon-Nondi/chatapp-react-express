import { combineReducers } from "redux";
import { io } from "socket.io-client";
const room = (state = "", action) => {
  if (action.type === "roomid") {
    return action.payload;
  }
  return state;
};

const roompassword = (state = "", action) => {
  if (action.type === "roompassword") {
    return action.payload;
  }
  return state;
};

const username = (state = "", action) => {
  if (action.type === "username") {
    return action.payload;
  }
  return state;
};

const userid = (state = "", action) => {
  if (action.type === "userid") {
    return action.payload;
  }
  if (action.type === "end") {
    return "";
  }
  return state;
};

const chattype = (state = "", action) => {
  if (action.type === "chattype") {
    return action.payload;
  }
  if (action.type === "end") {
    return "me-chat-room";
  }
  return state;
};

const cameraopen = (cameraOpenStatus = false, action) => {
  if (action.type === "cameraopen") {
    cameraOpenStatus = action.payload;
    return cameraOpenStatus;
  }
  if (action.type === "end") {
    return false;
  }
  return cameraOpenStatus;
};

const videoopen = (videoOpenStatus = "notCollectData", action) => {
  if(action.type==="videoopen") {
      return action.payload;
  }
  if(action.type==="end"){
      return "notCollectData";
  }
    else{
      return videoOpenStatus;
  }
};

const voiceopen = (voiceOpenStatus = "notCollectData", action) => {
  if (action.type === "voiceopen") {
    return action.payload;
  }
  if (action.type === "end") {
    return "notCollectData";
  } else {
    return voiceOpenStatus;
  }
};

let userDataList = {};

const users = (datastate = userDataList, action) => {
  if (action.type === "adduser") {
    let datastateDup = {};
    datastateDup[action.userId] = {
      username: action.userName,
      videodata:action.userVideo
    };
    return { ...datastate, ...datastateDup };
  }
  if (action.type === "deleteuser") {
    let datastateDup = JSON.parse(JSON.stringify(datastate));
    delete datastateDup[action.userId];
    return datastateDup;
  }
  if(action.type==="end"){
    return {}
  }
  return datastate;
};

const stepstatus = (status = "form", action) => {
  if (action.type === "stepstatus") {
    return action.payload;
  }
  if (action.type === "end") {
    return "form";
  }
  return status;
};

const socket = (
  oldsocket = io(`http://${document.location.hostname}:8000/`, {
    transports: ["websocket", "polling", "flashsocket"],
  }),
  action
) => {
  if (action.type === "end") {
    return io(`http://${document.location.hostname}:8000/`, {
      transports: ["websocket", "polling", "flashsocket"],
    });
  }
  return oldsocket;
};

const ownuserdata = (state = { imgdata: "/favicon.ico" }, action) => {
  if (action.type === "ownuserdata") {
    state.imgdata = action.imgdata;
  }
   if (action.type === "end") {
     return { imgdata: "/favicon.ico" };
   }
  return state;
};

const rootReducers = combineReducers({
  socket,
  stepstatus,
  room,
  roompassword,
  userid,
  username,
  chattype,
  cameraopen,
  videoopen,
  voiceopen,
  users,
  ownuserdata,
});

export default rootReducers;
