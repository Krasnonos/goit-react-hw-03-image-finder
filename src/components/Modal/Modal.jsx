import { createPortal } from 'react-dom';
import React, { PureComponent } from 'react';
import { Overlay, ModalBlock } from './Modal.styled';

const rootRef = document.querySelector('#modal-root');

export class Modal extends PureComponent {
  componentDidMount() {
    const modalRef = document.querySelector('[data-modal="wrap"]');
    modalRef.addEventListener('click', this.closeModalByBackdrop);
    window.addEventListener('keydown', this.closeModalByEsc);
  }

  componentWillUnmount() {
    const modalRef = document.querySelector('[data-modal="wrap"]');
    modalRef.removeEventListener('click', this.closeModalByBackdrop);
    window.removeEventListener('keydown', this.closeModalByEsc);
  }

  closeModalByBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  closeModalByEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <Overlay data-modal="wrap">
        <ModalBlock>
          <img
            src={this.props.modalCard.largeImageURL}
            alt={this.props.modalCard.tag}
          />
        </ModalBlock>
      </Overlay>,
      rootRef
    );
  }
}

// export const Modal = ({ modalCard }) => {
// return createPortal(
//   <Overlay>
//     <ModalBlock>
//       <img src={modalCard.largeImageURL} alt={modalCard.tag} />
//     </ModalBlock>
//   </Overlay>,
//   rootRef
// );
// };
