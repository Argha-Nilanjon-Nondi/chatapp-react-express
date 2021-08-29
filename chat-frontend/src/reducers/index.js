import { combineReducers } from "redux";

const room  = (state = "", action) => {
  if (action.type === "roomid") {
    return action.payload;
  }
  return state;
};

const roompassword  = (state = "", action) => {
  if (action.type === "roompassword") {
    return action.payload;
  }
  return state;
};

const username  = (state = "", action) => {
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


const chattype  = (state = "", action) => {
  if (action.type === "chattype") {
    return action.payload;
  }
  return state;
};

const cameraopen  = (state = "", action) => {
  if (action.type === "cameraopen") {
    return action.payload;
  }
  return state;
};

let datastate = {};

const addUser  = (datastate = datastate, action) => {
  if (action.type === "adduser") {
    datastate[action.userId] = action.userImg;
  }
  if (action.type === "adduserdata") {
    datastate[action.userId] = action.userImg;
  }
  return datastate;
};

const deleteUser=(datastate=datastate,action)=>{
  if (action.type === "deleteuser") {
    delete datastate[action.userId]; 
  }
}

const rootReducers = combineReducers({
  deleteUser,
  room ,
  roompassword ,
  userid,
  username ,
  chattype ,
  cameraopen ,
  addUser ,
});

export default rootReducers;
