import React from "react";
import { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./Components/Searchbar/Searchbar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";

export default class App extends Component {
  state = {
    imagesName: "",
  };

  handleFormSubmitImages = (imagesName) => {
    this.setState({ imagesName });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmitImages} />
        <ImageGallery ImageGallery={this.state.imagesName} />
        <ToastContainer />
      </div>
    );
  }
}
