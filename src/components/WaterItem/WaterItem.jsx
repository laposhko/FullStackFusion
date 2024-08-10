import { useSelector } from "react-redux";

import svg from "../../img/icons/sprite.svg";
import css from "../WaterItem/WaterItem.module.css";

import { useModalContext } from "../../context/useModalContext";
import WaterModal from "../WaterModal/WaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";
import {
  dayWaterAmount,
  selectActiveDay,
  selectWaterState,
  selectDayItems,
} from "../../redux/water/selectors";

function WaterItem(data) {
  const { openModal } = useModalContext();
  // console.log(waterAmount);
  // const water = useSelector(selectWaterState);

  // const time = useSelector(selectActiveDay);

  // console.log(water);

  return (
    <li className={css.waterItem}>
      <svg className={css.icon}>
        <use href={`${svg}#icon-trash`}></use>
      </svg>
      <div className={css.info}>
        {data && <p className={css.infoMl}>{data.data.volume} ml</p>}
        {/* <p className={css.infoMl}>
          {waterAmount != null && waterAmount != 0
            ? `${waterAmount} ml`
            : "0 ml"}
        </p> */}

        <p className={css.infoTime}>10:06 PM</p>
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
