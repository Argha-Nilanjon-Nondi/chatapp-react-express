import React, { Component } from "react";

export default class LeftRow extends Component {
  render() {
    return (
      <div className="col-12 my-2">
        <p className="custom-user-name">{this.props.username}</p>
        <div className="d-flex">
          <button className="btn btn-primary">{this.props.text}</button>
        </div>
      </div>
    );
  }
}
