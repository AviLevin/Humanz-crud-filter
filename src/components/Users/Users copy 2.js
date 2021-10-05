import React, { Component } from "react";
import classes from "./Users.module.css";
import CheckBox from "../CheckBox/CheckBox";
import User from "../Users/User/User";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      filterList: [
        {
          id: 11,
          name: "Brazil",
          country: "Brazil",
        },
        {
          id: 12,
          name: "Israel",
          country: "Israel",
        },
        {
          id: 13,
          name: "Denmark",
          country: "Denmark",
        },
      ],
      users: [],
      activeFilter: [],
      items:[],
      inputID:[],
      inputName:[],
      imageLoadError: true,

      value: '',
      text: ""
     
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);


  }

  handleTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }
  handleAddItem(event) {
    event.preventDefault();
    
    var newItem = {
      id: Date.now(),
      name: this.state.text,
      done: false
    };
    
    this.setState((prevState) => ({
      users: prevState.users.concat(newItem),
      text: ""
    }));
  }
  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  // handleSubmit(event) {
  //   alert('A name was submitted: ' + this.state.value);
  //   const newItem = this.state.value;
  //   const newItems = [newItem, ...this.state.items]
  //   this.state.items = {newItems: newItems}
  //   event.preventDefault();
  // }

  componentDidMount() {
    fetch("/data.json")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result,
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  onFilterChange(filter) {
    const { filterList, activeFilter } = this.state;
    if (filter === "ALL") {
      if (activeFilter.length === filterList.length) {
        this.setState({ activeFilter: [] });
      } else {
        this.setState({
          activeFilter: filterList.map((filter) => filter.country),
        });
      }
    } else {
      if (activeFilter.includes(filter)) {
        const filterIndex = activeFilter.indexOf(filter);
        const newFilter = [...activeFilter];
        newFilter.splice(filterIndex, 1);
        this.setState({ activeFilter: newFilter });
      } else {
        this.setState({ activeFilter: [...activeFilter, filter] });
      }
    }
  }

  ////////////////////////////////


  handleDelete = user => {
    const users = this.state.users.filter(c => c.id !== user);
    this.setState({ users });
    console.log( "deleted")
}

//////////////////////////////////

// handleAddButtonClick = () => {
//   const newItem = this.state({
//     name: this.state.inputName,
//     id: this.state.inputID,
//     // phone: inputPhone,
//     // ip: inputIP,
//     isSelected: false,
//   }); 

//   const newItems = [newItem, ...this.state.items];

//   this.items.setState(newItems);
  
// };




  render() {
    const { error, isLoaded, users } = this.state;
    const { filterList, activeFilter } = this.state;
    let filteredList;
    if (
      activeFilter.length === 0 ||
      activeFilter.length === filterList.length
    ) {
      filteredList = this.state.users;
    } else {
      filteredList = this.state.users.filter((item) =>
        this.state.activeFilter.includes(item.country)
      );
    }

    return (
      <div className={classes.container}>


{/* 
<form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form> */}
      
      <form className="row">
          <div className="col-md-3">
            <input type="text" className="form-control" onChange={this.handleTextChange} value={this.state.text} />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary" onClick={this.handleAddItem} disabled={!this.state.text}>{"Add #" + (this.state.items.length + 1)}</button>
          </div>
        </form>


<div className={classes.inputs}>
          <input
            type="text"
            value={this.inputName}
            onChange={(event) => this.setState(event.target.value)}
            className="add-item-input"
            placeholder="Add Name"
            required
          />
          {/* <input
            value={this.inputID}
            onChange={(event) => this.setState(event.target.value)}
            className="add-item-input"
            placeholder="Add ID"
          /> */}
          <br></br>
          {/* <input
            value={this.inputPhone}
            onChange={(event) => setInputPhone(event.target.value)}
            className="add-item-input"
            placeholder="Add Phone"
          />
          <input
            value={this.inputIP}
            onChange={(event) => setInputIP(event.target.value)}
            className="add-item-input"
            placeholder="Add IP address"
          /> */}
          <br></br>
          <button
            onClick={() => this.handleAddButtonClick()}
            type="button"
            class="btn btn-primary"
          >
            Add User
          </button>
        </div>
        <div className={classes.check}>
          <form>
            <label htmlFor="myInput">All</label>
            <input
              id="myInput"
              type="checkbox"
              onClick={() => this.onFilterChange("ALL")}
              checked={activeFilter.length === filterList.length}
            />
            {this.state.filterList.map((filter) => (
              <React.Fragment>
                <label htmlFor={filter.id}>{filter.country}</label>
                <input
                  id={filter.id}
                  type="checkbox"
                  checked={activeFilter.includes(filter.country)}
                  onClick={() => this.onFilterChange(filter.country)}
                />
              </React.Fragment>
            ))}
          </form>
        </div>

        <div className="row">
          <div className="col"></div>

          <div className="col-11">
            {filteredList.map((user) => (
              <User
                key={user.id}
                id={user.id}
                name={user.name}
                phone={user.phone}
                ip={user.ip}
                country={user.country}
                pic_url={user.pic_url}
                handleItemClick={this.handleDelete}
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
