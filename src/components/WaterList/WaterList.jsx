import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import WaterItem from "../WaterItem/WaterItem";
import css from "../WaterList/WaterList.module.css";
import { getWaterDayInfo } from "../../redux/water/operations";
import { selectDayItems } from "../../redux/water/selectors";

function WaterList() {
  const waterEntries = useSelector(selectDayItems);
  console.log(waterEntries);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!waterEntries) {
      dispatch(getWaterDayInfo());
    }
  }, [waterEntries, dispatch]);
  // const waterEntries = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className={css.waterInfo}>
      {waterEntries && waterEntries.length > 0 ? (
        <ul className={css.waterList}>
          {waterEntries.map((entry, index) => (
            // <WaterItem key={index} data={entry} />
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
