import React from "react";
import "../css/display.css";

export default class Display extends React.Component {
  render() {
    var value = this.props.displayValue;
    if (this.props.displayValue == "") {
      value = 0;
    }
    return (
      <div id="display">
        <h1 id="display-value">{value}</h1>
      </div>
    );
  }
}
