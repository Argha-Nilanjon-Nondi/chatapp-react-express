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
  return state;
};

const chattype = (state = "", action) => {
  if (action.type === "chattype") {
    return action.payload;
  }
  return state;
};

const cameraopen = (cameraOpenStatus = false, action) => {
  if (action.type == "cameraopen") {
    cameraOpenStatus = action.payload;
    return cameraOpenStatus;
  }       
    return cameraOpenStatus;
};

const videoopen = (videoOpenStatus = "notCollectData", action) => {

  switch (action.type) {
    case "videoopen":return action.payload;
  
      break;

    default: return videoOpenStatus;
      break;
  }
    
};

let userDataList = {};

const users = (datastate = userDataList, action) => { 
  if (action.type === "adduser") {
    let datastateDup={};
    datastateDup[action.userId] = {
      username: action.userName,
      imgdata: action.userImg,
    };
    return {...datastate,...datastateDup}
  }
  if (action.type === "deleteuser") {
    let datastateDup = JSON.parse(JSON.stringify(datastate));
    delete datastateDup[action.userId];
    return datastateDup;
  }
    return datastate;
  
};


const stepstatus = (status = "form", action) => {
  if (action.type === "stepstatus") {
    return action.payload;
  }
  return status;
};

const socket = (
  oldsocket = io(`http://${document.location.hostname}:8000/`, {
    transports: ["websocket", "polling", "flashsocket"],
  }),
  action
) => {
  if (action.type === "socket") {
    return action.oldsocket;
  }
  return oldsocket;
};

const ownuserdata = (state = { imgdata: "/favicon.ico" }, action) => {
  if (action.type === "ownuserdata") {
    state.imgdata = action.imgdata;
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
  users,
  ownuserdata,
});

export default rootReducers;
