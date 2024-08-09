import WaterForm from "../WaterModal/WaterModal";
import SvgIcon from "../../img/icons/sprite";
import css from "./WaterModal.module.css";

const WaterModal = ({ mode, onClose, water }) => {
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
      <button type="button" className={css.closeBtn} onClick={onClose}>
        <SvgIcon
          className={css.closeIcon}
          iconName="icon-close"
          width={24}
          height={24}
        />
      </button>

      {title}
      {subtitle}
      <WaterForm mode={mode} onClose={onClose} water={water} />
    </div>
  );
};

export default WaterModal;
