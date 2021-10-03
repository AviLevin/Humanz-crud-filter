import React, { useState, useEffect } from "react";
import classes from "./Users.module.css";

import User from "./User/User";

function Users() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);





  


//   handleDelete = counter => {
//     const counters = this.state.counters.filter(c => c.id !== counter);
//     this.setState({ counters });
//     console.log( "deleted")
// }


  // handleDelete = (counter) => {
  //   const counters = this.state.counters.filter((c) => c.id !== counter);
  //   this.setState({ counters });
  //   console.log("deleted");
  // };



  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(items)
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

    
    console.log(items)
    const handleDelete = user => {
      const newItemList = items.filter(
        i => i.id !== user
      );
  
      setItems(newItemList);
      console.log("deleted")
    
    };

    return (
      <div className={classes.container}>
        <div className="row">
          <div className="col"></div>

          <div className="col-11">
            {items.map((user, index) => (
              <User
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                gender={user.gender}
                car={user.car}
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
