import React from "react";
import Webcam from "react-webcam";
export default class WebcamCapture extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             img:""
        }
    }
    
  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({
        img:imageSrc
    })
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user",
    };

    return (
      <div>
        <Webcam
          audio={false}
          video={true}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />

        <img src={this.state.img} />
        <button onClick={this.capture}>Capture photo</button>
      </div>
    );
  }
}
