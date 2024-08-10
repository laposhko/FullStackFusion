import { useModalContext } from "../../context/useModalContext";
import SvgIcon from "../../img/icons/sprite";
import WaterForm from "../WaterForm/WaterForm";
import css from "./WaterModal.module.css";

const WaterModal = ({ mode, water }) => {
  const { closeModal } = useModalContext();
  const title =
    mode === "add" ? (
      <h2 className={css.title}>Add Water</h2>
    ) : (
      <h2 className={css.title}>Edit the entered amount of water</h2>
    );

  const subtitle =
    mode === "add" ? (
      <p className={css.subtitle}>Choose a value:</p>
    ) : (
      <p className={css.subtitle}>Correct entered data:</p>
    );

  return (
    <div className={css.wrapModal}>
      <button type="button" className={css.closeBtn} onClick={closeModal}>
        <SvgIcon
          className={css.closeIcon}
          iconName="icon-close"
          width={24}
          height={24}
        />
      </button>
      {title}
      {subtitle}
      <WaterForm mode={mode} water={water} />
    </div>
  );
};

export default WaterModal;

//p
