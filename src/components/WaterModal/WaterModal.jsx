import { useModalContext } from "../../context/useModalContext";
import { useTranslation } from "react-i18next";
import SvgIcon from "../../img/icons/sprite";
import WaterForm from "../WaterForm/WaterForm";
import css from "./WaterModal.module.css";

const WaterModal = ({ mode, water = {} }) => {
  const { closeModal } = useModalContext();
  const { t } = useTranslation();
  const title =
    mode === "add" ? (
      <h2 className={css.title}>{t("WaterModal.firstTitle")}</h2>
    ) : (
      <h2 className={css.title}>{t("WaterModal.secondTitle")}</h2>
    );

  const subtitle =
    mode === "add" ? (
      <p className={css.subtitle}>{t("WaterModal.firstSubtitle")}</p>
    ) : (
      <p className={css.subtitle}>{t("WaterModal.secondSubtitle")}</p>
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
