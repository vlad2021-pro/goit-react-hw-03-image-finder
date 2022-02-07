import { Component } from "react";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

export default class ImageGallery extends Component {
  state = {
    gallery: [],
    page: 1,
    total: 0,
    status: "idle",
    largeImageURL: "",
    webformatURL: "",
    error: null,
    showModal: false,
    imageURL: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imagesName;
    const nextName = this.props.imagesName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

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
            total: gallery.totalHits,
          })
        )
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
    if (prevPage !== nextPage && nextPage !== 1) {
      this.setState({ status: "pending" });
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=${nextPage}&key=11408941-3cf7894bd0fa3b9fec7ed7cf5&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => res.json())

        .then((newGallery) =>
          this.setState({
            gallery: [...prevState.gallery, ...newGallery.hits],
            status: "resolved",
            total: newGallery.totalHits,
          })
        )
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  onLoadMore = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  toggleModal = (largeImageURL = "") => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL,
    }));
  };

  render() {
    const { gallery, error, status, showModal, largeImageURL, total } =
      this.state;

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
        <>
          <ul className="ImageGallery">
            {gallery.map((image) => (
              <ImageGalleryItem
                key={image.id}
                largeImageURL={image.largeImageURL}
                imageURL={image.webformatURL}
                toggleModal={this.toggleModal}
              ></ImageGalleryItem>
            ))}
          </ul>

          {gallery.length < total ? (
            <Button
              type="button"
              state={this.state}
              onClick={this.onLoadMore}
            />
          ) : null}

          {showModal && (
            <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
          )}
        </>
      );
    }
  }
}
