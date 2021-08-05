import React, { Component } from 'react'
import "./css/loading.css"
export default class LoadingBar extends Component {
    render() {
        return (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        );
    }
}
