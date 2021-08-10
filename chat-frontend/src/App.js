import React, { Component, Fragment } from "react";
import { io } from "socket.io-client";
import Chat from "./components/Chat";
import NavBar from "./components/NavBar";
import LoadingBar from "./components/LoadingBar";
import Alert from "./components/Alert";
const socket = io(`http://${document.location.hostname}:8000/`, {
  transports: ["websocket", "polling", "flashsocket"],
});
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId:"",
      chattype: "",
      roomPassword: "",
      room: "",
      username: "",
      stepStatus: "form",
      errorContent: <></>,
    };
  }

  handleField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  joinChat = () => {
    this.setState({
      stepStatus: "loading",
    });
    socket.emit("join-chat", {
      roomId: this.state.room,
      username: this.state.username,
    });
  };

  createChat = () => {
    this.setState({
      stepStatus: "loading",
    });
    socket.emit("create-chat", {
      roomId: this.state.room,
      username: this.state.username,
    });
  };

  componentDidMount = () => {
    socket.on("chat",(data)=>{
    })
    //waiting for join chat response
    socket.on("join-chat", (data) => {
      let code = data.code;
      let userId = data.userId;
      if (code === "2000") {
        this.setState({
          stepStatus: "chatme",
          chattype: "host-chat-room",
          userId:userId
        });
      }
      if (code === "3000" || code === "3001") {
        this.setState({
          stepStatus: "form",
          errorContent: (
            <Alert
              type="danger"
              symbol="Error"
              text="Room or Username is not valid"
            ></Alert>
          ),
        });
      }
      if (code === "3002") {
        this.setState({
          stepStatus: "form",
          errorContent: (
            <Alert
              type="warning"
              symbol="Warning"
              text="Room ID is not valid"
            ></Alert>
          ),
        });
      }
    });

    //waiting for create room response
    socket.on("create-chat", (data) => {
      let code = data.code;
      let userId = data.userId;
      let message = data.message;
      if (code === "2001") {
        this.setState({
          stepStatus: "chatme",
          roomPassword: data.roomPassword,
          chattype: "me-chat-room",
          userId:userId
        });
      }
      if (code === "3000" || code === "3001") {
        this.setState({
          stepStatus: "form",
          errorContent: (
            <Alert
              type="danger"
              symbol="Error"
              text="Room or Username is not valid"
            ></Alert>
          ),
        });
      }
      if (code === "3003") {
        this.setState({
          stepStatus: "form",
          errorContent: (
            <Alert type="warning" symbol="Warning" text={message}></Alert>
          ),
        });
      }
    });
  };

  render() {
    return (
      <Fragment>
        <NavBar></NavBar>
        {/* <Chat>

        </Chat> */}
        {this.state.errorContent}
        {this.state.stepStatus === "loading" ? <LoadingBar></LoadingBar> : ""}
        {this.state.stepStatus === "form" ? (
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
                  value={this.state.room}
                  onChange={this.handleField}
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
                    value={this.state.username}
                    onChange={this.handleField}
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
                  onClick={this.joinChat}
                >
                  <i className="fas fa-satellite-dish"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-1"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Create a chat"
                  onClick={this.createChat}
                >
                  <i className="far fa-plus-square"></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.stepStatus === "chatme" ? (
          <Chat
          socket={socket}
            room={this.state.room}
            roomPassword={this.state.roomPassword}
            userid={this.state.userid}
            username={this.state.username}
            chattype={this.state.chattype}
          ></Chat>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}
