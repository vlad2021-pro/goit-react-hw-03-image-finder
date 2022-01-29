import { Component } from "react";
// import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    imagesName: "",
  };

  handleNameChange = (event) => {
    this.setState({ imagesName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.imagesName.trim() === "") {
      alert("Wow so easy!");
    }
    this.props.onSubmit(this.state.imagesName);

    this.setState({ imagesName: "" });
  };

  render() {
    return (
      <div>
        <header>
          <form onSubmit={this.handleSubmit}>
            <button type="submit">
              <span>Search</span>
            </button>

            <input
              type="text"
              placeholder="Search images and photos"
              value={this.state.imagesName}
              onChange={this.handleNameChange}
            />
          </form>
        </header>
      </div>
    );
  }
}
