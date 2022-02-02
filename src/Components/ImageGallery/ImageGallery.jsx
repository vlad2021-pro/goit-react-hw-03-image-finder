import { Component } from "react";
import Loader from "../Loader/Loader";

export default class ImageGallery extends Component {
  state = {
    gallery: [],
    page: 1,
    total: 0,
    status: "idle",
    largeImageURL: "",
    webformatURL: "",
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imagesName;
    const nextName = this.props.imagesName;

    if (prevName !== nextName) {
      console.log("Изменить имя");
      this.setState({ status: "pending" });
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=11408941-3cf7894bd0fa3b9fec7ed7cf5&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`${nextName} nextNameimages do not exist.`)
          );
        })

        .then((gallery) =>
          this.setState({
            gallery: [...gallery.hits],
            status: "resolved",
          })
        )
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  render() {
    const { gallery, error, status } = this.state;

    if (status === "idle") {
      return <div>Enter a name for the picture</div>;
    }
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "rejected") {
      return <div>{error.message}</div>;
    }

    if (status === "resolved") {
      return (
        <ul className="ImageGallery">
          {gallery.map((image) => (
            <li key={image.id} largeImageURL={image.largeImageURL}>
              <img src={image.webformatURL} alt="" />
            </li>
          ))}
        </ul>
      );
    }
  }
}
