import React, { Component } from 'react'

export default class RightRow extends Component {
    render() {
        return (
          <div className="col-12 d-flex flex-row-reverse my-1">
            <div className="py-1">
              <p className="custom-user-name">{this.props.username}</p>
              <button className="btn btn-primary">{this.props.text}</button>
            </div>
          </div>
        );
    }
}
