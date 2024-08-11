import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import WaterItem from "../WaterItem/WaterItem";
import css from "../WaterList/WaterList.module.css";
import { getWaterDayInfo } from "../../redux/water/operations";
import { selectDayItems } from "../../redux/water/selectors";

function WaterList() {
  const waterEntries = useSelector(selectDayItems);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!waterEntries) {
      dispatch(getWaterDayInfo());
    }
  }, [waterEntries, dispatch]);

  return (
    <div className={css.waterInfo}>
      {waterEntries && waterEntries.length > 0 ? (
        <ul className={css.waterList}>
          {waterEntries.map((entry, index) => (
            <WaterItem key={index} data={entry} />
          ))}
        </ul>
      ) : (
        <p className={css.empty}>Empty 😥</p>
      )}
    </div>
  );
}

export default WaterList;
