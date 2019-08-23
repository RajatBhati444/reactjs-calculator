import React from "react";
import { tsPropertySignature } from "@babel/types";

const Input = props => {
  const { className, placeholder, value, onKeypress } = props;
  return (
    <input
      placeholder={placeholder}
      className={className}
      value={value}
      onKeyDown={onKeypress}
    />
  );
};

export default Input;
