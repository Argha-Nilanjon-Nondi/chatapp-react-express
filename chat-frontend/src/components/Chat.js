import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import {
  ownUserData,
  addUserData,
  cameraOpen,
  deleteUser,
  videoOpen,
  setStepStatus,
  endMeeding,
  voiceOpen,
} from "../action/index";
import Peer from "simple-peer";
import MemberCard from "./MemberCard";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videodata: null
    };

    this.owndata=React.createRef();
  }

  sendVoiceData = () => {
    navigator.mediaDevices
      .getUserMedia({ video:true, audio: true })
      .then((stream) => {
        this.owndata.current.srcObject=stream
        this.props.socket.emit("chat", {
          roomId: this.props.room,
          video: stream,
        });
      })

  };

  componentDidMount = () => {
    this.props.socket.on("chat", (data) => {
      let code = data.code;
      if (code === "2003") {
        if (data.userId === this.props.userid) {
          this.props.ownUserData(data.video);
        }
        this.props.addUserData(
          data.userId,
          data.username,
          data.video
        );
      }

      //if anybody left the room
      if (code === "2005") {
        this.props.deleteUser(data.userId);
      }

      //getting all members Id
      if (code === "2004") {
        data.userList.map((obj) => {
          return this.props.addUserData(
            obj.userId,
            obj.username,
            null
          );
        });
      }

      //if anyone joins
      if (code === "2002") {
        this.props.addUserData(
          data.userId,
          data.username,
          null
        );
      }

      //if meeting end
      if (code === "2006") {
        this.props.endMeeding();
      }
    });
  };

  render() {
    return (
  <Fragment>
        <div className="mt-2 row justify-content-center">
          <div className="col-5 col-lg-4 border border-secondary rounded-3 py-1 px-1 mx-1 my-1">
            <h1 className="fs-4">{this.props.username}</h1>
            <div className="my-1 chat-image-frame">
              <video
                ref={this.owndata}
                className="img-fluid img-thumbnail chat-image"
                autoPlay
              ></video>
            </div>

            <button
              className="btn btn-primary fs-1 mx-1"
              onClick={this.sendVoiceData}
            >
              {/* {this.props.cameraopen ? ( */}
                <i class="fas fa-play-circle"></i>
              {/* // ) : (
              //   <i class="fas fa-pause"></i>
              // )} */}
            </button>
            {/* <button
              className="btn btn-primary fs-1 mx-1"
              onClick={this.startVoice}
            >
              {this.props.voiceopen === "collectData" ? (
                <i class="fas fa-microphone"></i>
              ) : (
                <i class="fas fa-microphone-slash"></i>
              )}
            </button> */}
          </div>
        </div>
        <div className="row justify-content-center">
          {Object.keys(this.props.users).map((obj) => (
            <MemberCard
              key={Math.random()}
              username={this.props.users[obj].username}
              videodata={this.props.users[obj].videodata}
            ></MemberCard>
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (props) => {
  return {
    socket: props.socket,
    room: props.room,
    stepstatus: props.stepstatus,
    roompassword: props.roompassword,
    userid: props.userid,
    username: props.username,
    chattype: props.chattype,
    cameraopen: props.cameraopen,
    videoopen: props.videoopen,
    voiceopen: props.voiceopen,
    users: props.users,
    ownuserdata: props.ownuserdata,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    ownUserData: (value) => dispatch(ownUserData(value)),
    addUserData: (userId, username, img) =>
      dispatch(addUserData(userId, username, img)),
    deleteUser: (userId) => dispatch(deleteUser(userId)),
    videoOpen: (value) => dispatch(videoOpen(value)),
    voiceOpen: (value) => dispatch(voiceOpen(value)),
    cameraOpen: (value) => dispatch(cameraOpen(value)),
    setStepStatus: (value) => dispatch(setStepStatus(value)),
    endMeeding: () => dispatch(endMeeding()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
