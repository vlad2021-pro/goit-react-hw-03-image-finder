import { Component } from "react";

export default class Searchbar extends Component {
  state = {
    imagesName: "",
    imges: [],
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
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.handleSubmit}>
            <button className="SearchForm-button" type="submit">
              <span className="button">Search</span>
            </button>

            <input
              className="SearchForm-input"
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
