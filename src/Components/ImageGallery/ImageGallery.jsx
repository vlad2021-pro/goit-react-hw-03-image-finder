import { Component } from "react";

export default class ImageGallery extends Component {
  state = {
    gallery: [],
    loading: false,
    page: 1,
    total: 0,
    status: "idle",
    largeImageURL: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imagesName;
    const nextName = this.props.imagesName;

    if (prevName !== nextName) {
      console.log("Изменить имя");
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=11408941-3cf7894bd0fa3b9fec7ed7cf5&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => res.json())
        .then((gallery) =>
          this.setState({
            gallery: [...gallery.hits],
          })
        );
    }
  }

  render() {
    const { gallery, loading } = this.state;
    const { imagesName } = this.props;

    console.log(gallery);
    return (
      <div>
        {loading && <div>Loading.....</div>}
        {!imagesName && <div>Enter a name for the picture</div>}
        <ul>
          {gallery.map((image) => (
            <li key={image.id} largeimageurl={image.largeImageURL}></li>
          ))}
        </ul>
      </div>
    );
  }
}
