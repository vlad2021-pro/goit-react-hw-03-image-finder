import { Component } from "react";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { fetchImages } from "../../Untils/api";

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

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imagesName;
    const nextName = this.props.imagesName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    let response;
    if (prevName !== nextName || prevPage !== nextPage) {
      try {
        this.setState({ status: "pending" });

        response = await fetchImages({ nextName, nextPage });

        if (!response) {
          this.setState({ status: "rejected" });
          console.error("Cannot find conditions for fetching images");
          return;
        }
        this.setState({
          gallery: prevState.gallery
            ? [...prevState.gallery, ...response.hits]
            : response.hits,
          status: "resolved",
          total: response.totalHits,
        });
      } catch (e) {
        this.setState({ status: "rejected" });
        console.error(e);
      }
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
      return <div>{error ? error.message : "Empty error"}</div>;
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
