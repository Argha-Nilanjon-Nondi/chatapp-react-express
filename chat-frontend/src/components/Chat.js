import React, { Component, Fragment } from "react";
import { io } from "socket.io-client";
import ReactScrollableFeed from "react-scrollable-feed";
import CryptoJS from "crypto-js";
import LeftRow from "./LeftRow";
import RightRow from "./RightRow";
import LoadingBar from "./LoadingBar";
const socket = io(`http://${document.location.hostname}:8000/`, {
  transports: ["websocket", "polling", "flashsocket"],
});

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textMsg: "",
      loadingStatus: true,
      msgList: [],
    };
  }

  handleField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  sendMsg = () => {
    //send message
    const keys = this.props.room;
    const ciphertext = CryptoJS.AES.encrypt(this.state.textMsg, keys);
    const message = ciphertext.toString();
    socket.emit("chat", {
      msg: message,
    });
  };

  componentDidMount = () => {
    //send request to join room chat
    socket.emit("join-room", {
      room: this.props.room,
      username: this.props.username,
    });

    //waiting for message
    socket.on("chat", (data) => {
      const code = data.code;
      //get room join staus
      if (code === "2000") {
        const message = data.message;
        const username = data.username;
        const userId = data.userId;
        localStorage.setItem("userid", userId);
        this.setState({
          loadingStatus: false,
          msgList: this.state.msgList.concat({
            username: username,
            message: message,
            userId: userId,
          }),
        });
      }
      //get message
      if (code === "2001") {
        const keys = this.props.room;
        const userId = data.userId;
        const username = data.username;
        const bytes = CryptoJS.AES.decrypt(data.message, keys);
        const message = bytes.toString(CryptoJS.enc.Utf8);
        //set messages in the state
        this.setState({
          loadingStatus: false,
          msgList: this.state.msgList.concat({
            username: username,
            message: message,
            userId: userId,
          }),
        });
      }
      //getting data if a use leave or addedy
      if (code === "2002") {
        const message = data.message;
        const username = data.username;
        const userId = data.userId;
        this.setState({
          msgList: this.state.msgList.concat({
            username: username,
            message: message,
            userId: userId,
          }),
        });
      }
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.loadingStatus ? (
          <LoadingBar></LoadingBar>
        ) : (
          <Fragment>
            <div className="container row mt-2 custom-block-center chat-box-responsive">
              <ReactScrollableFeed>
                {this.state.msgList.map((obj) =>
                  localStorage.getItem("userid") === obj.userId ? (
                    <RightRow
                      username={obj.username}
                      text={obj.message}
                      key={Math.random()}
                    ></RightRow>
                  ) : (
                    <LeftRow
                      username={obj.username}
                      text={obj.message}
                      key={Math.random()}
                    ></LeftRow>
                  )
                )}
              </ReactScrollableFeed>
            </div>

            <div className="container row mt-2" style={{ margin: "0 auto" }}>
              <div className="col-11">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Type message here"
                    id="floatingTextarea"
                    name="textMsg"
                    value={this.state.textMsg}
                    onChange={this.handleField}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Message</label>
                </div>
              </div>
              <div className="col-1">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.sendMsg}
                >
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
