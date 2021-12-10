import React, { Component } from "react";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoSrc:null
    };

    this.videoRef=React.createRef()
  }

  componentDidMount=()=>{
    setInterval(()=>{ this.videoStart();},100)
   
  }

  videoStart=()=>{
    navigator.mediaDevices
      .getUserMedia({ video:{width:200,height:200}, audio: true })
      .then((stream) => {
        this.videoRef.current.srcObject=stream
        console.log(this.videoRef.current.srcObject);
      })// }).then().then((chunk)=>{
      //   let recordedBlob=new Blob(chunk);
      //     let audioData = URL.createObjectURL(recordedBlob);
      //   this.videoRef.current.src=audioData;
      // });
  }

  render() {

    return (
      <div>
        <audio playsInline ref={this.videoRef} autoPlay></audio>
        <button onClick={this.stop}>Stop</button>
      </div>
    );
  }
}
