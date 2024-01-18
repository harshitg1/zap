import React from "react";

const Button = ({ handleButtonClick,invoice, children }) => {
  return (
    <>
      <button
        className="bg-black text-white px-4 py-2 mt-2 border rounded-md"
        onClick={() => handleButtonClick(invoice)}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
