import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import {
  ownUserData,
  addUserData,
  addUser,
  cameraOpen,
  deleteUser,
  videoOpen,
  setStepStatus,
} from "../action/index";
import Webcam from "react-webcam";
import MemberCard from "./MemberCard";

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
    addUser: (userId, username, img) =>
      dispatch(addUser(userId, username, img)),
    videoOpen: (value) => dispatch(videoOpen(value)),
    cameraOpen: (value) => dispatch(cameraOpen(value)),
    setStepStatus: (value) => dispatch(setStepStatus(value)),
  };
};
class Chat extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  webcamRef = (webcam) => {
    this.webcam = webcam;
  };
  sendData = () => {
    if (this.props.videoopen == "collectData") {
      const imageSrc = this.webcam.getScreenshot({
        with: 100,
        height: 100,
      });
      this.props.socket.emit("chat", {
        roomId: this.props.room,
        img: imageSrc,
      });
    }
    if (this.props.videoopen == "notCollectData") {
      this.props.socket.emit("chat", {
        roomId: this.props.room,
        img: "/favicon.ico",
      });
    }
  };
  componentDidMount = () => {
    this.props.socket.on("chat", (data) => {
      let code = data.code;

      if (code === "2003") {
        if (data.userId === this.props.userid) {
          this.props.ownUserData(data.img);
        }
        this.props.addUserData(data.userId, data.username, data.img);
      }

      //if anybody left the room
      if (code === "2005") {
        this.props.deleteUser(data.userId);
      }

      //getting all members Id
      if (code === "2004") {
        data.userList.map((obj) => {
          this.props.addUser(obj.userId, obj.username, "./favicon.ico");
        });
      }

      //if anyone joins
      if (code === "2002") {
        this.props.addUser(data.userId, data.username, "./favicon.ico");
      }
    });
  };

  startVideo = () => {
    let videoStart = this.props.cameraopen == true ? false : true;
    var timeStep;
    if (videoStart == true) {
      this.props.videoOpen("collectData");
      this.props.cameraOpen(true);
      timeStep = setInterval(() => {
        this.sendData();
      }, 100);
    }
    if (videoStart == false) {
      this.props.videoOpen("notCollectData");
      this.props.cameraOpen(false);
      clearInterval(timeStep);
    }

    alert(this.props.videoopen);
  };
  render() {
    const videoConstraints = {
      width: 100,
      height: 100,
      facingMode: "user",
    };
    return (
      <Fragment>
        {this.props.cameraopen ? (
          <Webcam
            audio={false}
            height={100}
            ref={this.webcamRef}
            screenshotFormat="image/jpeg"
            screenshotQuality={3}
            width={100}
            videoConstraints={videoConstraints}
          />
        ) : (
          ""
        )}
        <div className="mt-2 row justify-content-center">
          <div className="col-5 col-lg-4 border border-secondary rounded-3 py-1 px-1 mx-1 my-1">
            <h1 className="fs-4">{this.props.username}</h1>
            <div className="my-1 chat-image-frame">
              <img
                alt="Sorry"
                src={this.props.ownuserdata.imgdata}
                className="img-fluid img-thumbnail chat-image"
              />
            </div>

            <button className="btn btn-primary fs-1" onClick={this.startVideo}>
              {this.props.cameraopen ? (
                <i class="fas fa-play-circle"></i>
              ) : (
                <i class="fas fa-pause"></i>
              )}
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          {Object.keys(this.props.users).map((obj) => (
            <MemberCard
              key={Math.random()}
              username={this.props.users[obj].username}
              imgdata={this.props.users[obj].imgdata}
            ></MemberCard>
          ))}
        </div>
        {/* <div>
         

          <img src={this.state.img} />
          <button onClick={this.capture}>Capture photo</button>
        </div> */}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
