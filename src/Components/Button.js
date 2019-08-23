import React from "react";

const Button = props => {
  const { className, buttonPressed } = props;
  return (
    <button className={className} onClick={() => buttonPressed(props.children)}>
      {props.children}
    </button>
  );
};

export default Button;
