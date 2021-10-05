import React, { useState, useEffect, useCallback } from "react";
import classes from "./Users.module.css";
import CheckBox from "../CheckBox/CheckBox";

import User from "./User/User";

function Users() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputID, setInputID] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputIP, setInputIP] = useState("");
  const [selectNat, setSelectNat] = useState([]);

  const handleAddButtonClick = () => {
    const newItem = {
      name: inputName,
      id: inputID,
      phone: inputPhone,
      ip: inputIP,
      isSelected: false,
    };

    const newItems = [newItem, ...items];

    setItems(newItems);
    setInputName("");
  };

  const handleDelete = (user) => {
    const newItemList = items.filter((i) => i.id !== user);

    setItems(newItemList);
    console.log("deleted");
  };

  const nation = [
    { value: "BR", label: "Brazil" },
    { value: "AU", label: "Australia" },
    { value: "CA", label: "Canada" },
    { value: "IL", label: "Israel" },
    { value: "DE", label: "Germany" },
    { value: "DK", label: "Denmark" },
  ];

  // FUNCTION CHECKBOX FILTER
  const onToggleSelectNat = useCallback(
    (value) => {
      let newArray = items;
      let index = items.indexOf(value);
      if (index === -1) {
        newArray.push(value);
      } else {
        newArray.splice(index, 1);
      }
      setSelectNat([...newArray]);
    },

    [items]
  );

  ///////////////////////////////

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className={classes.container}>
      <div className={classes.header}>
        <br></br>
        {/* <div className={classes.check}> */}
          <div className="row row-users">
            <div className={classes.checklist}>
              {nation.map((na, index) => (
                <CheckBox
                  key={index}
                  value={na.value}
                  label={na.label}
                  onChange={onToggleSelectNat}
                />
              ))}
            </div>
          </div>
        {/* </div> */}

        <div className={classes.inputs}>
          <input
            type="text"
            value={inputName}
            onChange={(event) => setInputName(event.target.value)}
            className="add-item-input"
            placeholder="Add Name"
            required
          />
          <input
            value={inputID}
            onChange={(event) => setInputID(event.target.value)}
            className="add-item-input"
            placeholder="Add ID"
          />
          <br></br>
          <input
            value={inputPhone}
            onChange={(event) => setInputPhone(event.target.value)}
            className="add-item-input"
            placeholder="Add Phone"
          />
          <input
            value={inputIP}
            onChange={(event) => setInputIP(event.target.value)}
            className="add-item-input"
            placeholder="Add IP address"
          />
          <br></br>
          <button
            onClick={() => handleAddButtonClick()}
            type="button"
            class="btn btn-primary"
          >
            Add User
          </button>
        </div>
        </div>
        <div className="row">
          <div className="col"></div>

          <div className="col-11">
            {items.map((user, index) => (
              <User
                key={user.id}
                id={user.id}
                name={user.name}
                phone={user.phone}
                ip={user.ip}
                country={user.country}
                pic_url={user.pic_url}
                handleItemClick={handleDelete}
              />
            ))}
          </div>
          <div className="col"></div>
        </div>
      </div>
    );
  }
}

export default Users;
