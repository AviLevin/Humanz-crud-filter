import React, { Component } from "react";
import classes from "./Users.module.css";
import CheckBox from "../CheckBox/CheckBox";
import User from "../Users/User/User";

class CheckBoxTwo extends Component {
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
      imageLoadError: true,
    };
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

  // const handleDelete = (user) => {
  //   const newItemList = items.filter((i) => i.id !== user);

  //   setItems(newItemList);
  //   console.log("deleted");
  // };

  handleDelete = user => {
    const users = this.state.users.filter(c => c.id !== user);
    this.setState({ users });
    console.log( "deleted")
}




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

export default CheckBoxTwo;
