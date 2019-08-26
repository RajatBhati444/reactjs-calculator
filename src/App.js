import React from "react";
import "./App.css";
import Button from "./Components/Button";
import Input from "./Components/Input";
import PortalModel from "./Components/PortalModel";
import { validate } from "@babel/types";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      showModel: false,
      historyResult: [],
      activeButton: false,
      activeButtonName: "",
      showForm: true,
      buttonDisable: false,
      dots: 0,
      dotPress: 0
    };
    this.buttonPressed = this.buttonPressed.bind(this);
    this.acPressed = this.acPressed.bind(this);
    this.calculate = this.calculate.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.operatorPressed = this.operatorPressed.bind(this);
    this.handleShowMessageClick = this.handleShowMessageClick.bind(this);
    this.pressFunction = this.pressFunction.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.dotPresss = this.dotPresss.bind(this);
  }

  handleShowMessageClick = () => {
    const { showModel } = this.state;
    this.setState({ showModel: !showModel });
  };

  operatorPressed(child) {
    const { result, dots } = this.state;

    const lastEl = result.charAt(result.length - 1);
    if (lastEl === "-" || lastEl === "+" || lastEl === "/" || lastEl === "*") {
      return;
    } else {
      this.setState({
        result: result + child,
        activeButton: true,
        activeButtonName: child,
        buttonDisable: false,
        dotPress: 0
      });
    }
  }

  calculate() {
    let { result, historyResult, buttonDisable } = this.state;
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
          historyResult: Calculation,
          buttonDisable: buttonDisable,
          dots: 0
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
    let { result, buttonDisable } = this.state;
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
        if (child == ".") {
          this.setState({
            buttonDisable: !buttonDisable
          });
        }
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

  keyPress(val) {
    const { result, pressDot } = this.state;
    console.log("this is val  : " + val);
    if (val > 0 && val < 9) {
      this.setState({
        result: result + val
      });
    }
  }
  dotPresss() {
    console.log("dotPressCall");
    const { result } = this.state;
    this.setState({
      result: result + "."
    });
  }

  pressFunction(e) {
    const { dotPress } = this.state;
    console.log(e.keyCode);
    console.log(String.fromCharCode(e.keyCode));
    if (e.keyCode === 8) {
      this.acPressed();
    } else {
      this.keyPress(String.fromCharCode(e.keyCode));
    }
    if (e.keyCode === 190) {
      this.setState({
        dotPress: dotPress + 1
      });
      if (dotPress >= 1) {
        console.log(this.dotPress);
      } else {
        this.dotPresss();
      }
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
      showForm,
      buttonDisable
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
                      buttonDisable={buttonDisable}
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
