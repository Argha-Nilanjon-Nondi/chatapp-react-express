import React, { Component, Fragment } from "react";
import { io } from "socket.io-client";
import Webcam from "react-webcam";
import CryptoJS from "crypto-js";
import MemberCard from "./MemberCard";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoStart:false,
      room: this.props.room,
      chattype: this.props.chattype,
      roomPassword: this.props.roomPassword,
      ownUserId: this.props.userid,
      cameraOpen: true,
      dataList: {},
    };
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  sendData = () => {
    if(this.state.videoStart===true){
    const imageSrc = this.webcam.getScreenshot();
    this.props.socket.emit("chat", {
      roomId: this.state.room,
      img: imageSrc,
    });
  }
  };

  componentDidMount = () => {
    this.props.socket.on("chat", (data) => {
      let code = data.code;

      if(code==="2003"){
        let userId = data.userId;
        let img = data.img;
        let username=data.userName;

        this.setState((previousState) => {
          let dataList = Object.assign({}, previousState.dataList);
          dataList[userId] = {
            username: username,
            imgdata:img,
          };

          return { dataList };
        });
      }

      //if anybody left the room
      if (code === "2005") {
        console.log(data);
        this.setState((previousState) => {
          let dataList = Object.assign({}, previousState.dataList);
          delete dataList[data.userId];
          return { dataList };
        });
      }

      //getting all members Id
      if (code === "2004") {
        this.setState((previousState) => {
          let dataList = Object.assign({}, previousState.dataList);
          data.userList.map((obj) => {
            dataList[obj.userId] = {
              username: obj.userName,
              imgdata: "/favicon.ico",
            };
          });
          return { dataList };
        });
      }

      //if anyone joins
      if (code === "2002") {
        let userId = data.userId;
        let username = data.username;

        this.setState((previousState) => {
          let dataList = Object.assign({}, previousState.dataList);
          dataList[userId] = {
            username: username,
            imgdata: "/favicon.ico",
          };

          return { dataList };
        });
      }
    });
  };

  startVideo=()=>{
   this.setState((previousState)=>{
   let videoStart=this.state.videoStart==true?false:true;
   var timeStep;
   if(videoStart===true){
    timeStep= setInterval(()=>{
     this.sendData();
     },100)
   }
   if(videoStart==false){
     clearInterval(timeStep);
   }
   return {videoStart};
   });
  //  if (this.state.videoStart == false) {
  //    clearInterval(sendMe);
  //  }
   
  }

  render() {
    const videoConstraints = {
      width: 1000,
      height: 1000,
      facingMode: "user",
    };

    return (
      <Fragment>
        {
          this.state.videoStart?( <Webcam
            audio={false}
            height={100}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={100}
            videoConstraints={videoConstraints}
          />):("")
        }
        <div className="container">
          <button className="btn btn-primary" onClick={this.startVideo}>Start Video</button>
        </div>
        <div className="row justify-content-center">
          {Object.keys(this.state.dataList).map((obj) => (
            <MemberCard
              key={Math.random()}
              username={this.state.dataList[obj].username}
              imgdata={this.state.dataList[obj].imgdata}
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
