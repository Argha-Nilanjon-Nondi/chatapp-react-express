import React, { Component } from 'react'

export default class MemberCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
          <div className="col-5 col-lg-4 border border-secondary rounded-3 py-1 px-1 mx-1 my-1">
            <h1 className="fs-4">{this.props.username}</h1>
            <div className="my-1 chat-image-frame">
              <img
              alt="Sorry"
                src={this.props.imgdata}
                className="img-fluid img-thumbnail chat-image"
              />
            </div>
          </div>
        );
    }
}
