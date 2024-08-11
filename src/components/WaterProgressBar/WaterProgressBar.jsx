import { useSelector } from "react-redux";
import { selectWaterAmountForDay } from "../../redux/water/selectors";
import { selectAuthUser } from "../../redux/auth/selectors";
import css from "./WaterProgressBar.module.css";
import { selectActiveDay } from "../../redux/water/selectors";
import formatDate from "../../helpers/formatDate";
const WaterProgressBar = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCurrentUserInformation());
  //   dispatch(getWaterDayInfo());
  // }, [dispatch]);

  const user = useSelector(selectAuthUser);
  const waterAmount = useSelector(selectWaterAmountForDay);
  // console.log(waterAmount);
  const day = useSelector(selectActiveDay);
  const dayAmount = waterAmount.length > 0 ? waterAmount[0].dayAmount : 0;
  // console.log(dayAmount)

  const dailyNorma = user && user.dailyWaterNorm ? user.dailyWaterNorm : 1.5;
  // console.log(dailyNorma);

  const percentage = Math.min(
    100,
    Math.round((dayAmount / 1000 / dailyNorma) * 100)
  );
  // console.log(percentage)

  const showPercentage = (percentage) => {
    return (
      (percentage >= 14 && percentage <= 39) ||
      (percentage >= 64 && percentage <= 85)
    );
  };

  return (
    <div className={css.waterProgressBar}>
      <div className={css.today}>{formatDate(day)}</div>
      <div className={css.progressContainer}>
        <div className={css.progressBar} style={{ width: `${percentage}%` }}>
          {showPercentage(percentage) && (
            <span className={css.progressLabel}>{percentage}%</span>
          )}
          <span className={css.round}></span>
        </div>
      </div>
      <div className={css.labels}>
        <span className={css.label}>0%</span>
        <span className={css.label}>50%</span>
        <span className={css.label}>100%</span>
      </div>
    </div>
  );
};

export default WaterProgressBar;
