import React, { Component, Fragment } from "react";
import Chat from "./components/Chat";
import NavBar from "./components/NavBar";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: "",
      username: "",
      loadingStatus: false,
    };
  }

  handleField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  setRoom = (event) => {
    event.preventDefault();
    this.setState({
      loadingStatus: true,
    });
  };

  render() {
    return (
      <Fragment>
        <NavBar></NavBar>

        {this.state.loadingStatus ? (
          <Chat room={this.state.room} username={this.state.username}></Chat>
        ) : (
          <div className="container custom-block-center">
            <form
              className="row gy-2 gx-3 justify-content-center my-2"
              onSubmit={this.setRoom}
            >
              <div className="col-12 col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  id="autoSizingInput"
                  placeholder="Room"
                  name="room"
                  minLength="10"
                  onChange={this.handleField}
                  required
                />
              </div>
              <div className="col-12 col-lg-6">
                <div className="input-group">
                  <div className="input-group-text">@</div>
                  <input
                    type="text"
                    className="form-control"
                    id="autoSizingInputGroup"
                    placeholder="Username"
                    name="username"
                    minLength="5"
                    onChange={this.handleField}
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-lg-1">
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-satellite-dish"></i>
                </button>
              </div>
            </form>
          </div>
        )}
      </Fragment>
    );
  }
}
