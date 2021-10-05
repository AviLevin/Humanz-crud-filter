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
      items: [],
     
      imageLoadError: true,

      value: "",
      name: "",
      id: "",
      phone: "",
      ip: "",
      
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleIpChange = this.handleIpChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value,
     
    });
  }


  handlePhoneChange(event) {
    this.setState({
      phone: event.target.value,
    });
  }
  handleIdChange(event) {
    this.setState({
      id: event.target.value,
    });
  }
  handleIpChange(event) {
    this.setState({
      ip: event.target.value,
    });
  }

  handleAddItem(event) {
    event.preventDefault();

    var newItem = {
      
      name: this.state.name,
      phone:this.state.phone,
      id:this.state.id,
      ip:this.state.ip,
      done: false,
    };

    this.setState((prevState) => ({
      users: [newItem, ...this.state.users], 
      name: "",
      phone: "",
      id: "",
      ip: "",
    }));
  }

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

  handleDelete = (user) => {
    const users = this.state.users.filter((c) => c.id !== user);
    this.setState({ users });
    console.log("deleted");
  };

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
      <div className={classes.header2}>
        
        <form className={classes.inputs} >
          <div className="col">
            <input
              type="text"
              className="form-control"
              onChange={this.handleNameChange}
              value={this.state.name}
              placeholder="Name.."
            />
            <input
              type="text"
              className="form-control"
              onChange={this.handlePhoneChange}
              value={this.state.phone}
              placeholder="Phone.."
            />
            <input
              type="text"
              className="form-control"
              onChange={this.handleIdChange}
              value={this.state.id}
              placeholder="ID.."
            />
            <input
              type="text"
              className="form-control"
              onChange={this.handleIpChange}
              value={this.state.ip}
              placeholder="IP.."
            />
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-primary"
              onClick={this.handleAddItem}
              disabled={!this.state.name}
            >
              {"Add" }
            </button>
          </div>
        </form>

        <div className={classes.checklist}>
          <form>
            <label htmlFor="myInput">All</label>
            &nbsp;&nbsp;
            <input
              id="myInput"
              type="radio"
              onClick={() => this.onFilterChange("ALL")}
              checked={activeFilter.length === filterList.length}
            />
            {this.state.filterList.map((filter) => (
              <React.Fragment>
                &nbsp;&nbsp;&nbsp;
                <label htmlFor={filter.id}>{filter.country}</label>
                &nbsp;&nbsp;
                <input
                  id={filter.id}
                  type="radio"
                  checked={activeFilter.includes(filter.country)}
                  onClick={() => this.onFilterChange(filter.country)}
                />
              </React.Fragment>
            ))}
          </form>
        </div>
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
