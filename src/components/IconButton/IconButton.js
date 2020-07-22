import React, { useState, useEffect } from "react";

import "./IconButton.css";

const IconButton = ({ icon, onClick, alt, small }) => {
  return (
    <button onClick={onClick} className={"Icon-button"}>
      <img
        src={icon}
        alt={alt}
        className={small ? "Small-icon" : "Medium-icon"}
      ></img>
    </button>
  );
};

export default IconButton;
