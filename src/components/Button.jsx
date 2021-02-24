import React from "react";

const Button = ({ children, ...rest }) => {
  return (
    <button
      className="py-3 px-5 rounded-md uppercase bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
