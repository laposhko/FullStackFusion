import SvgIcon from "../../img/icons/sprite.jsx";
import css from "./Modal.module.css";
const Modal = () => {
  // const dispatch = useDispatch();
  // const { isOpen, contentId } = useSelector((state) => state.modal);
  // if (!isOpen) return null;
  // const ModalContent = componentMap[contentId] || null;
  return (
    <div className={css.modal}>
      <button>
        <SvgIcon
          className={css.closeIcon}
          iconName="icon-close"
          width={24}
          height={24}
        ></SvgIcon>
      </button>

      {/* <button onClick={() => dispatch(closeModal())}>Close</button> */}
      {/* {ModalContent ? <ModalContent></ModalContent> : <p></p>} */}
    </div>
  );
};
export default Modal;
