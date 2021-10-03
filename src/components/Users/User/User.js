import React from "react";
import classes from "../Users.module.css";
import HeartIcon from "./HeartIcon";



const User = (props) => {
  return (
    <div className={classes.card}>
      <div className={classes.cardtop}>
                <span className={classes.name}>{props.name}</span>
                <span className={classes.name}>{props.location}</span>
                <span className={classes.icon}>
                  <button
                  // isVisible={props.isFavorited(props.user)}
                    type="button"
                    onClick={() => props.handleItemClick(props.id)}
                   
                    className={classes.heartButton}
                  >
                    <HeartIcon  ></HeartIcon>
                  </button>
                </span>
              </div>

      <img
        className={classes.image}
        src={
          props.pic_url
            ? props.pic_url
            : props.gender === "Male"
            ? "https://www.w3schools.com/bootstrap4/img_avatar3.png"
            : "https://www.w3schools.com/bootstrap4/img_avatar5.png"
        }
      />

      <br></br>

      <br></br>

      <div className={classes["card-body"]}>
        <ul>
        <li>
              <b>id: </b> {props.id}
            </li>
        <li>
              <b>phone: </b> {props.phone}
            </li>
        <li>
              <b>IP address: </b> {props.ip}
            </li>
        <li>
              <b>country </b> {props.country}
            </li>
        </ul>
      </div>

      <br></br>
    
    </div>
  );
};

export default User;





