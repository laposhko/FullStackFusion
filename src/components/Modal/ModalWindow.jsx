import SvgIcon from "../../img/icons/sprite.jsx";
import css from "./ModalWindow.module.css";
import { useEffect } from "react";
import Modal from "react-modal";
import { useModalContext } from "../../context/useModalContext.jsx";

Modal.setAppElement("#root");

const ModalWindow = ({
  isOpen,
  onRequestClose,
  children,
  shouldCloseOnOverlayClick = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      style={{
        overlay: {
          backgroundColor: "rgba(47, 47, 47, 0.6)",
          zIndex: "15",
          overflow: "auto",
          display: "grid",
          placeItems: "center",
        },
      }}
      className={{
        base: css.modal,
        afterOpen: css.modalContentOpen,
        beforeClose: css.beforeClose,
      }}
    >
      {/* <div className={css.modal}> </div>*/}
      <button onClick={onRequestClose} className={css.closeButton}>
        <SvgIcon
          className={css.closeIcon}
          iconName="icon-close"
          width={24}
          height={24}
        ></SvgIcon>
      </button>
      {children}
    </Modal>
  );
};

const Modals = () => {
  const { isOpen, closeModal, modalContent } = useModalContext();

  return (
    <ModalWindow isOpen={isOpen} onRequestClose={closeModal}>
      {modalContent}
    </ModalWindow>
  );
};

export default Modals;
