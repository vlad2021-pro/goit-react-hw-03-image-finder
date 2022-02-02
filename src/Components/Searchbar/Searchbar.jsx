import { Component } from "react";
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchbarForm,
  SearchFormButtonLabel,
} from "../Searchbar/Searchbar.styled";

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
        <SearchbarForm>
          <SearchForm onSubmit={this.handleSubmit}>
            <SearchFormButton type="submit">
              <SearchFormButtonLabel>Search</SearchFormButtonLabel>
            </SearchFormButton>

            <SearchFormInput
              type="text"
              placeholder="Search images and photos"
              value={this.state.imagesName}
              onChange={this.handleNameChange}
            />
          </SearchForm>
        </SearchbarForm>
      </div>
    );
  }
}
