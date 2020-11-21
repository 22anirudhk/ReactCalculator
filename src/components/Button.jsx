import React from "react";
import "../css/numpad.css";

export default class Button extends React.Component {
  render() {
    let onClickFunction;
    if (this.props.type == "operator") {
      onClickFunction = this.props.handleClick;
    } else {
      onClickFunction = () => {
        this.props.handleClick(this.props.buttonValue);
      };
    }
    return (
      <div>
        <button class="number-button" onClick={onClickFunction}>
          {this.props.buttonValue}
        </button>
      </div>
    );
  }
}
