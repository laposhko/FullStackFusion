import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import WaterItem from "../WaterItem/WaterItem";
import css from "../WaterList/WaterList.module.css";
import { getWaterDayInfo } from "../../redux/water/operations";
import { selectDayItems } from "../../redux/water/selectors";
import { selectActiveDay } from "../../redux/water/selectors";
import { useTranslation } from "react-i18next";

function WaterList() {
  const date = useSelector(selectActiveDay);
  const waterEntries = useSelector(selectDayItems);
  const { t } = useTranslation();

  return (
    <div className={css.waterInfo}>
      {waterEntries && waterEntries.length > 0 ? (
        <ul className={css.waterList}>
          {waterEntries.map((entry, index) => (
            <WaterItem key={index} data={entry} />
          ))}
        </ul>
      ) : (
        <p className={css.empty}>{t("WaterList.empty")} 😥</p>
      )}
    </div>
  );
}

export default WaterList;
