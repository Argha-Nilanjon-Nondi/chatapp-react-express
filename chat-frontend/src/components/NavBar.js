import React, { Component } from "react";
import { connect } from "react-redux";
import { endMeeding, roomPassword } from "../action/index";
class NavBar extends Component {
  handleField = (event) => {
    this.props.roomPassword(event.target.value);
  };
  endMeeting = () => {
    this.props.socket.emit("end-meeting", {
      roomPassword:this.props.roompassword
    });
    this.props.endMeeding();
  };
  leaveMeeting = () => {
    this.props.endMeeding();
    this.props.socket.emit("leave-meeting", {
      roomPassword: this.props.roompassword,
    });
    this.props.endMeeding();
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <i className="fas fa-comment-dots btn btn-primary fs-2"></i>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Chat App
                </a>
              </li>
            </ul>
          </div>
          {this.props.stepstatus !== "form" ? (
            <div
              class="collapse navbar-collapse row justify-content-end"
              id="navbarSupportedContent"
            >
              {this.props.chattype == "me-chat-room" ? (
                <div className="row justify-content-end col-9">
                  {this.props.roompassword == "" ? (
                    <input
                      class="col mx-1 px-1 py-1 rounded"
                      type="search"
                      placeholder="Room Password"
                      onChange={this.handleField}
                    />
                  ) : (
                    ""
                  )}
                  <button class="btn btn-danger col-4 mx-1" type="button" onClick={this.endMeeting}>
                    End Meeting
                  </button>
                </div>
              ) : (
                ""
              )}
              {this.props.chattype == "host-chat-room" ? (
                <button class="btn btn-danger col-3 mx-1" type="button" onClick={this.leaveMeeting}>
                  Leave Meeting
                </button>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (props) => {
  return {
    roompassword: props.roompassword,
    chattype: props.chattype,
    stepstatus: props.stepstatus,
    socket:props.socket
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    endMeeding: () => dispatch(endMeeding()),
    roomPassword: (value) => dispatch(roomPassword(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
