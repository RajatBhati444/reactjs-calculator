import React from "react";
import "./App.css";
import Button from "./Components/Button";
import Input from "./Components/Input";
import PortalModel from "./Components/PortalModel";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      showModel: false,
      historyResult: [],
      activeButton: false,
      activeButtonName: "",
      showForm: true
    };
    this.buttonPressed = this.buttonPressed.bind(this);
    this.acPressed = this.acPressed.bind(this);
    this.calculate = this.calculate.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.operatorPressed = this.operatorPressed.bind(this);
    this.handleShowMessageClick = this.handleShowMessageClick.bind(this);
    this.pressFunction = this.pressFunction.bind(this);
  }

  handleShowMessageClick = () => {
    const { showModel } = this.state;
    this.setState({ showModel: !showModel });
  };

  operatorPressed(child) {
    const { result } = this.state;

    const lastEl = result.charAt(result.length - 1);
    if (lastEl === "-" || lastEl === "+" || lastEl === "/" || lastEl === "*") {
      return;
    } else {
      this.setState({
        result: result + child,
        activeButton: true,
        activeButtonName: child
      });
    }
  }

  calculate() {
    let { result, historyResult } = this.state;
    this.setState({
      activeButton: false
    });
    const lastEl = result.charAt(result.length - 1);
    const firstEl = result.charAt(0);
    const indexOfPlus = result.lastIndexOf("+");

    if (lastEl === "-" || lastEl === "+" || lastEl === "*" || lastEl === "/") {
      return alert("please remove operators at ends...");
    }

    if (result == "") {
      return;
    } else {
      const val = eval(result);

      const tb = val.toString();
      if (typeof tb == "string") {
        console.log(typeof val);
        this.setState({
          result: val + ""
        });

        const Calculation = [...historyResult];
        Calculation.push({
          value: result,
          result: val
        });
        this.setState({
          historyResult: Calculation
        });
      }
      if (val == "Infinity") {
        alert("Infinity");
        this.setState({
          result: ""
        });
      }
    }
  }

  buttonPressed(child) {
    let { result } = this.state;
    var n = result.startsWith(0);
    var m = result.startsWith("*");
    var o = result.startsWith("/");
    var indexOfPlus = result.lastIndexOf("+");
    var indexOfDivide = result.lastIndexOf("/");
    var indexOfMult = result.lastIndexOf("*");
    var indexOfSubs = result.lastIndexOf("-");
    var indexOfDot = result.lastIndexOf(".");

    if (child === "=") {
      this.calculate();
    } else if (child === "AC") {
      this.setState({
        result: "",
        activeButton: false
      });
    } else {
      console.log(n);
      if (n || m || o) {
        var res = result.slice(1, result.length);
        this.setState({
          result: res,
          activeButton: false
        });
      } else if (
        result[result.length - 1] == "." &&
        result[result.length - 2] == "."
      ) {
        const re = result.slice(0, result.length - 1);
        this.setState({
          result: re,
          activeButton: false
        });
      } else if (
        result[indexOfMult + 1] == 0 ||
        result[indexOfDivide + 1] == 0 ||
        result[indexOfSubs + 1] == 0 ||
        result[indexOfPlus + 1] == 0
      ) {
        var resss = result.slice(0, indexOfPlus + 1);
        var resSub = result.slice(0, indexOfSubs + 1);
        var resMul = result.slice(0, indexOfMult + 1);
        var ressDiv = result.slice(0, indexOfDivide + 1);

        this.setState({
          result: resss || resSub || resMul || ressDiv,
          activeButton: false
        });
      } else {
        console.log(indexOfPlus);
        this.setState({
          result: result + child,
          activeButton: false
        });
      }
    }
  }

  acPressed() {
    const { result } = this.state;
    const rs = result;
    this.setState({
      activeButton: false
    });

    if (rs == undefined) {
      return;
    } else {
      let newStr;
      if (typeof rs === "string") {
        newStr = rs.substring(0, rs.length - 1);
      } else {
        return this.setState({
          result: ""
        });
      }

      this.setState({
        result: newStr
      });
    }
  }

  closeWindow() {
    const { showForm } = this.state;
    this.setState({
      showForm: !showForm
    });
  }

  pressFunction(e) {
    if (e.keyCode === 8) {
      this.acPressed();
    } else {
      return;
    }
  }

  render() {
    document.title = "React-Calculator";
    const {
      result,
      showModel,
      historyResult,
      activeButton,
      activeButtonName,
      showForm
    } = this.state;

    return (
      <div>
        {showModel ? (
          <PortalModel
            handleCloseModal={this.handleShowMessageClick}
            values={historyResult}
          />
        ) : null}

        <div className="App">
          <Button className="circularButton" buttonPressed={this.closeWindow}>
            ~
          </Button>

          {showForm ? (
            <div className="formm">
              <div className="inputcontainer">
                <Input
                  className="input"
                  value={result}
                  onKeypress={this.pressFunction}
                />
              </div>

              <div className="Allbutton">
                <div className="acToplus">
                  <div className="acTotwo">
                    <div className="twobutton">
                      <Button
                        className="colorButtonTwo"
                        buttonPressed={this.acPressed}
                      >
                        Del
                      </Button>
                      <Button
                        className="colorButtonTwo"
                        buttonPressed={this.buttonPressed}
                      >
                        AC
                      </Button>
                    </div>

                    <div className="twobutton">
                      <Button
                        className="button"
                        buttonPressed={this.buttonPressed}
                      >
                        7
                      </Button>
                      <Button
                        className="button"
                        buttonPressed={this.buttonPressed}
                      >
                        8
                      </Button>
                    </div>

                    <div className="twobutton">
                      <Button
                        className="button"
                        buttonPressed={this.buttonPressed}
                      >
                        4
                      </Button>
                      <Button
                        className="button"
                        buttonPressed={this.buttonPressed}
                      >
                        5
                      </Button>
                    </div>
                    <div className="twobutton">
                      <Button
                        className="button"
                        buttonPressed={this.buttonPressed}
                      >
                        1
                      </Button>
                      <Button
                        className="button"
                        buttonPressed={this.buttonPressed}
                      >
                        2
                      </Button>
                    </div>
                  </div>

                  <div className="ninetoplus">
                    <div className="twobutton">
                      <Button
                        className="colorButtonTwo"
                        buttonPressed={this.handleShowMessageClick}
                      >
                        Res.
                      </Button>
                      <Button
                        className={
                          activeButton && activeButtonName === "/"
                            ? "operatorActive"
                            : "colorButton"
                        }
                        buttonPressed={this.operatorPressed}
                      >
                        /
                      </Button>
                    </div>
                    <div className="twobutton">
                      <Button
                        className="button"
                        buttonPressed={this.buttonPressed}
                      >
                        9
                      </Button>
                      <Button
                        className={
                          activeButton && activeButtonName === "*"
                            ? "operatorActive"
                            : "colorButton"
                        }
                        buttonPressed={this.operatorPressed}
                      >
                        *
                      </Button>
                    </div>
                    <div className="twobutton">
                      <Button
                        className="button"
                        buttonPressed={this.buttonPressed}
                      >
                        6
                      </Button>

                      <Button
                        className={
                          activeButton && activeButtonName === "-"
                            ? "operatorActive"
                            : "colorButton"
                        }
                        buttonPressed={this.operatorPressed}
                      >
                        -
                      </Button>
                    </div>
                    <div className="twobutton">
                      <Button
                        className="button"
                        buttonPressed={this.buttonPressed}
                      >
                        3
                      </Button>
                      <Button
                        className={
                          activeButton && activeButtonName === "+"
                            ? "operatorActive"
                            : "colorButton"
                        }
                        buttonPressed={this.operatorPressed}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="zerotoAll">
                  <div className="zero">
                    <Button
                      className="button"
                      buttonPressed={this.buttonPressed}
                    >
                      0
                    </Button>
                  </div>
                  <div className="dottoequal">
                    <Button
                      className="button"
                      buttonPressed={this.buttonPressed}
                    >
                      .
                    </Button>
                    <Button
                      className="colorButton"
                      buttonPressed={this.calculate}
                    >
                      =
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default App;
