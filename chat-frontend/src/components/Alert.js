import React, { Component } from 'react'
import "./css/alert.css"
export default class Alert extends Component {
    
    render() {
        return (
          <div
            className={`alert alert-${this.props.type} alert-dismissible custom-alert`}
            role="alert"
          >
            <strong>{this.props.symbol}</strong> {this.props.text}
          </div>
        );
    }
}
