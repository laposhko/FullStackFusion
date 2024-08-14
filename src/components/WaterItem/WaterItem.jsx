import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import svg from "../../img/icons/sprite.svg";
import css from "../WaterItem/WaterItem.module.css";

import { useModalContext } from "../../context/useModalContext";
import WaterModal from "../WaterModal/WaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";
import {
  selectWaterAmountForDay,
  selectActiveDay,
  selectWaterState,
  selectDayItems,
} from "../../redux/water/selectors";

function WaterItem(data) {
  const { openModal } = useModalContext();
  const { t } = useTranslation();
  function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
  return (
    <li className={css.waterItem} data-tour="step-6">
      <svg className={css.icon}>
        <use href={`${svg}#icon-water-glass`}></use>
      </svg>
      <div className={css.info}>
        {data && (
          <p className={css.infoMl}>
            {data.data.volume} {t("WaterItem.ml")}
          </p>
        )}
        {data && <p className={css.infoTime}>{formatTime(data.data.date)}</p>}
      </div>
      <div className={css.btnsWrapper}>
        <button
          className={css.btn}
          onClick={() => {
            openModal(<WaterModal mode="edit" water={data.data} />);
          }}
        >
          <svg className={css.svg}>
            <use href={`${svg}#icon-Vector`}></use>
          </svg>
        </button>
        <button
          className={css.btn}
          onClick={() => {
            openModal(<DeleteWaterModal cardId={data.data._id} />);
          }}
        >
          <svg className={css.svg}>
            <use href={`${svg}#icon-trash`}></use>
          </svg>
        </button>
      </div>
    </li>
  );
}

export default WaterItem;
