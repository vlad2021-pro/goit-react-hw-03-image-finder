export const fetchImages = async function ({ nextName, nextPage }) {
  const response = await fetch(
    `https://pixabay.com/api/?q=${nextName}&page=${nextPage}&key=11408941-3cf7894bd0fa3b9fec7ed7cf5&image_type=photo&orientation=horizontal&per_page=12`
  );
  return await response.json();
};

//   console.log("Изменить имя");
//   this.setState({ status: "pending" });
//   fetch(
//     `https://pixabay.com/api/?q=${nextName}&page=1&key=11408941-3cf7894bd0fa3b9fec7ed7cf5&image_type=photo&orientation=horizontal&per_page=12`
//   )
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       return Promise.reject(
//         new Error(`${nextName} nextNameimages do not exist.`)
//       );
//     })

//     .then((gallery) =>
//       this.setState({
//         gallery: [...gallery.hits],
//         status: "resolved",
//         total: gallery.totalHits,
//       })
//     )
//     .catch((error) => this.setState({ error, status: "rejected" }));
// }

//   this.setState({ status: "pending" });
//   fetch(
//     `https://pixabay.com/api/?q=${nextName}&page=${nextPage}&key=11408941-3cf7894bd0fa3b9fec7ed7cf5&image_type=photo&orientation=horizontal&per_page=12`
//   )
//     .then((res) => res.json())

//     .then((newGallery) =>
//       this.setState({
//         gallery: [...prevState.gallery, ...newGallery.hits],
//         status: "resolved",
//         total: newGallery.totalHits,
//       })
//     )
//     .catch((error) => this.setState({ error, status: "rejected" }));

// }
