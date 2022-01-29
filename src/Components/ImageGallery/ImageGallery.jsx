import { Component } from "react";

export default class ImageGallery extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.ImageGallery !== this.props.ImageGallery)
      fetch(
        "https://pixabay.com/api/?q=cat&page=1&11408941-3cf7894bd0fa3b9fec7ed7cf5&image_type=photo&orientation=horizontal&per_page=12"
      );
  }

  render() {
    return (
      <div>
        <ul>
          <li>{this.props.ImageGallery}</li>
        </ul>
      </div>
    );
  }
}
