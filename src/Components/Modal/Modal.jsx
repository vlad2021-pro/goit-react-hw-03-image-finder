import React, { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    console.log("componentDidMount");

    window.addEventListener("keydown", this.hadleKeyDown);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");

    window.removeEventListener("keydown", this.hadleKeyDown);
  }

  hadleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  backDropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div>
        <div className="Overlay" onClick={this.backDropClick}>
          <div className="Modal">
            <img src={this.props.largeImageURL} alt="" />
          </div>
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
