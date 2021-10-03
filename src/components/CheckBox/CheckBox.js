import React, { useState } from "react";
import classes from './CheckBox.module.css';


const CheckBox = ({ label, value }) => {

  const mystyle = {
   
    float: 'left'
  };

  return (
    <div className={classes.formCheck}>
    <div className="form-check" style={mystyle}>
      <input
      
        className="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckDefault"
      />
    <label  class="form-check-label" for="flexCheckDefault">
    {label}
  </label>
    </div>
    </div>
  );
};

export default CheckBox;
