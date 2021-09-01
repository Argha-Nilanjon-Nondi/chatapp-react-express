import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  roomId,
  roomPassword,
  userName,
  userId,
  chatType,
  setStepStatus,
} from "./action/index";
import Chat from "./components/Chat";
import NavBar from "./components/NavBar";
import LoadingBar from "./components/LoadingBar";
import Alert from "./components/Alert";
export default function App() {
  const socket = useSelector((socket) => socket.socket);
  const room = useSelector((state) => state.room);
  const roompassword = useSelector((state) => state.roompassword);
  const username = useSelector((state) => state.username);
  const userid = useSelector((state) => state.userid);
  const chattype = useSelector((state) => state.chattype);
  const stepStatus = useSelector((state) => state.stepstatus);
  const [errorContent, setErrorContent] = useState(<></>);
  const dispatch = useDispatch();

  const handleField = (event) => {
    if (event.target.name === "room") {
      dispatch(roomId(event.target.value));
    }
    if (event.target.name === "username") {
      dispatch(userName(event.target.value));
    }
  };

  const joinChat = () => {
    dispatch(setStepStatus("loading"));
    socket.emit("join-chat", {
      roomId: room,
      username: username,
    });
  };

  const createChat = () => {
    dispatch(setStepStatus("loading"));
    socket.emit("create-chat", {
      roomId: room,
      username: username,
    });
  };

  useEffect(() => {
    window.onbeforeunload = () => {
      socket.disconnect();
    };
    //waiting for join chat response
    socket.on("join-chat", (data) => {
      let code = data.code;
      if (code === "2000") {
        dispatch(setStepStatus("chatme"));
        dispatch(chatType("host-chat-room"));
        dispatch(userId(data.userId));
      }
      if (code === "3000" || code === "3001") {
        dispatch(setStepStatus("form"));
        setErrorContent(
          <Alert
            type="danger"
            symbol="Error"
            text="Room or Username is not valid"
          ></Alert>
        );
      }
      if (code === "3002") {
        dispatch(setStepStatus("form"));
        setErrorContent(
          <Alert
            type="danger"
            symbol="Error"
            text="Room or Username is not valid"
          ></Alert>
        );
      }
    });

    //waiting for create room response
    socket.on("create-chat", (data) => {
      let code = data.code;
      let message = data.message;
      if (code === "2001") {
        dispatch(setStepStatus("chatme"));
        dispatch(roomPassword(data.roomPassword));
        dispatch(chatType("me-chat-room"));
        dispatch(userId(data.userId));
      }
      if (code === "3000" || code === "3001") {
        dispatch(setStepStatus("form"));
        setErrorContent(
          <Alert
            type="danger"
            symbol="Error"
            text="Room or Username is not valid"
          ></Alert>
        );
      }
      if (code === "3003") {
        dispatch(setStepStatus("form"));
        setErrorContent(
          <Alert type="warning" symbol="Warning" text={message}></Alert>
        );
      }
    });
  });

  return (
    <Fragment>
      <NavBar></NavBar>
      {/* <Chat>

        </Chat> */}
      {errorContent}
      {stepStatus === "loading" ? <LoadingBar></LoadingBar> : ""}
      {stepStatus === "form" ? (
        <div className="container custom-block-center">
          <div className="row gy-2 gx-3 justify-content-center my-2">
            <div className="col-12 col-lg-6">
              <input
                type="text"
                className="form-control"
                id="autoSizingInput"
                placeholder="Room"
                name="room"
                minLength="10"
                value={room}
                onChange={handleField}
                required
              />
            </div>
            <div className="col-12 col-lg-4">
              <div className="input-group">
                <div className="input-group-text">@</div>
                <input
                  type="text"
                  className="form-control"
                  id="autoSizingInputGroup"
                  placeholder="Username"
                  name="username"
                  minLength="5"
                  value={username}
                  onChange={handleField}
                  required
                />
              </div>
            </div>
            <div className="col-12 col-lg-1 d-flex">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Join a chat"
                onClick={joinChat}
              >
                <i className="fas fa-satellite-dish"></i>
              </button>
              <button
                type="button"
                className="btn btn-primary mx-1"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Create a chat"
                onClick={createChat}
              >
                <i className="far fa-plus-square"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {stepStatus === "chatme" ? (
          <Chat />
      ) : (
        ""
      )}
    </Fragment>
  );
}
