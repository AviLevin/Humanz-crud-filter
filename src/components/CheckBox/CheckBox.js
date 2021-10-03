import React, { useState } from "react";
import classes from "./CheckBox.module.css";

const CheckBox = ({ isChecked, onChange, label, value }) => {
  const handleChange = (e) => {
    onChange && onChange(value);
  };
  const mystyle = {
    float: "left",
  };

  return (
    <div className={classes.formCheck}>
      <div className="form-check" style={mystyle}>
        <input
          className="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          name={label}
          checked={isChecked}
          onChange={(e) => handleChange(e)}
        />
        <label class="form-check-label" for="flexCheckDefault">
          {label}
        </label>
      </div>
    </div>
  );
};

export default CheckBox;
