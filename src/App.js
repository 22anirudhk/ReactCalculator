import Display from './components/Display';
import Button from "./components/Button";
import React from 'react';
import './css/style.css';
import './css/numpad.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      previousNum: "",
      currentNum: "",
      operator: "",
      operationDone: false
    };
    this.addToInput = this.addToInput.bind(this);
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.multiply = this.multiply.bind(this);
    this.divide = this.divide.bind(this);
    this.equals = this.equals.bind(this);
    this.clear = this.clear.bind(this);
  }

  addToInput(value) {
    //Erase old output but only right after you start new expression
    if(this.state.operationDone){
      this.state.operationDone = false;
      this.state.input = "";
    }
    this.setState({input: this.state.input + value});
  }

  add() {
    this.setState({previousNum: this.state.input, input:"", operator:"add"});
  }
  subtract() {
    this.setState({previousNum: this.state.input, input:"", operator:"subtract"});
  }

  multiply() {
    this.setState({previousNum: this.state.input, input:"", operator:"multiply"});
  }
  divide() {
    this.setState({previousNum: this.state.input, input:"", operator:"divide"});
  }
  clear () {
    this.setState({currentNum:"", previousNum:"", operator:"", input:"", operationDone:true})
  }

  equals() {

    if(this.state.input == "" || this.state.previousNum == "") {
      return;
    }
    var output;

    this.state.currentNum = this.state.input; //doesn't work w/ with setState
    //setState is asynchronous so it may not finish before continuing, so just set it directly
    //"setState calls are not guaranteed to be applied immediately."

    console.log(this.state.previousNum);
    console.log(this.state.currentNum);

    if(this.state.operator == "add") {
      output = parseInt(this.state.previousNum) + parseInt(this.state.currentNum);
    }
    if(this.state.operator == "subtract") {
      output = parseInt(this.state.previousNum) - parseInt(this.state.currentNum);
    }
    if(this.state.operator == "multiply") {
      output = parseInt(this.state.previousNum) * parseInt(this.state.currentNum);
    }
    if(this.state.operator == "divide") {
      output = parseInt(this.state.previousNum) * 1.0 / parseInt(this.state.currentNum);
    }

    this.setState({currentNum:"", previousNum:"", operator:"", input:output, operationDone:true})
  }
  

  render () {
    return (
      <div className="App">
        <Display displayValue={this.state.input}/>
        <table id = "numpad">
          <tr>
            <td>
              <Button
                buttonValue="1"
                type="number"
                handleClick={this.addToInput}
              />
            </td>
            <td>
              <Button
                buttonValue="2"
                type="number"
                handleClick={this.addToInput}
              />
            </td>
            <td>
              <Button
                buttonValue="3"
                type="number"
                handleClick={this.addToInput}
              />
            </td>
            <td>
              <Button
                buttonValue="/"
                type="operator"
                handleClick={this.divide}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Button
                buttonValue="4"
                type="number"
                handleClick={this.addToInput}
              />
            </td>
            <td>
              <Button
                buttonValue="5"
                type="number"
                handleClick={this.addToInput}
              />
            </td>
            <td>
              <Button
                buttonValue="6"
                type="number"
                handleClick={this.addToInput}
              />
            </td>
            <td>
              <Button
                buttonValue="x"
                type="operator"
                handleClick={this.multiply}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Button
                buttonValue="7"
                type="number"
                handleClick={this.addToInput}
              />
            </td>
            <td>
              <Button
                buttonValue="8"
                type="number"
                handleClick={this.addToInput}
              />
            </td>
            <td>
              <Button
                buttonValue="9"
                type="number"
                handleClick={this.addToInput}
              />
            </td>
            <td>
              <Button
                buttonValue="+"
                type="operator"
                handleClick={this.add}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Button
                buttonValue="0"
                type="number"
                handleClick={this.addToInput}
              />
            </td>
            <td>
              <Button
                buttonValue="C"
                type="number"
                handleClick={this.clear}
              />
            </td>
            <td>
              <Button
                buttonValue=" "
                type="number"
                handleClick={ () => {}}
              />
            </td>
            <td>
              <Button
                buttonValue="-"
                type="operator"
                handleClick={this.subtract}
              />
            </td>
            
          </tr>
          <tr>
            <td>
            </td>
            <td>
            </td>
            <td>
            </td>
            <td>
              <Button
                buttonValue="="
                type="operator"
                handleClick={this.equals}
              />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default App;