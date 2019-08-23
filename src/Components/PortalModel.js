import ReactDOM from "react-dom";
import React from "react";
import "../App.css";
const Portalmodel = document.getElementById("portal-root");

const PortalModel = props => {
  const { handleCloseModal, values } = props;

  const { container, valuesConatiner, valuesdiv } = styles;

  return ReactDOM.createPortal(
    <div className="onClose" style={container}>
      <div style={valuesConatiner}>
        {values.map(v => {
          return (
            <div>
              <div style={valuesdiv}>
                <p>{v.value}</p> {"="} <p>{v.result}</p>
              </div>
              <br />
            </div>
          );
        })}
        <hr />
        <button className="portalCloseButton" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    </div>,
    Portalmodel
  );
};

const styles = {
  container: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  valuesConatiner: {
    padding: 20,
    background: "lightGrey",
    borderRadius: "2px",
    display: "inline-block",
    minHeight: "300px",
    margin: "1rem",
    position: "relative",
    minWidth: "300px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    justifySelf: "center"
  },
  valuesdiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
};

export default PortalModel;
