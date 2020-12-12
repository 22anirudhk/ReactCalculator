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
    

    if(this.state.previousNum === "") {
      return;
    }

    var output;

    this.state.currentNum = this.state.input; //doesn't work w/ with setState
    //setState is asynchronous so it may not finish before continuing, so just set it directly
    //"setState calls are not guaranteed to be applied immediately."

    //Default second term to 0
    if(this.state.input === "") {
      this.state.currentNum = 0;
    }

   
    console.log(this.state.previousNum);
    console.log(this.state.currentNum);

    //Rounding and decimals in Javascript don't work as expected. This function helps. (Ex: W/o it, 1.2 * 9 becomes 1.79999)
    //Keep function inside since not "class method"
    //https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
    function roundTo(n, digits) {
      var negative = false;
      if (digits === undefined) {
        digits = 0;
      }
      if (n < 0) {
          negative = true;
          n = n * -1;
      }
      var multiplicator = Math.pow(10, digits);
      n = parseFloat((n * multiplicator).toFixed(11));
      n = (Math.round(n) / multiplicator).toFixed(digits);
      if (negative) {
          n = (n * -1).toFixed(digits);
      }
      return n;
    }

    //You need parse because state stores it as string
    if(this.state.operator === "add") {
      output = parseFloat(this.state.previousNum) + parseFloat(this.state.currentNum);
    }
    if(this.state.operator === "subtract") {
      output = parseFloat(this.state.previousNum) - parseFloat(this.state.currentNum);
    }
    if(this.state.operator === "multiply") {
      output = parseFloat(this.state.previousNum) * parseFloat(this.state.currentNum);
      output = roundTo(output, 10);
    }
    if(this.state.operator === "divide") {
      output = parseFloat(this.state.previousNum) * 1.0 / parseFloat(this.state.currentNum);
      output = roundTo(output, 10);
    }

    //Remove unneeded 0's after roundTo possibly 
    if(output.includes(".")) {
      //Can convert to string back and then to float again (it works).
      output = output.toString();
      output = parseFloat(output);
    }

    this.setState({currentNum:"", previousNum:"", operator:"", input:output, operationDone:true})
  }
  

  render () {
    return (
      <div className="App">
        <Display displayValue={this.state.input}/>
        <table id = "numpad">
          <tbody>
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
                buttonValue="."
                type="number"
                handleClick={this.addToInput}
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
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;