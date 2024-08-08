import { useSelector } from 'react-redux';
import { selectDayItems } from '../../redux/water/selectors';
import css from './WaterProgressBar.module.css';

const WaterProgressBar = ({ dailyNorma }) => {
  const todayWaterArray = useSelector(selectDayItems);
  const totalVolume = todayWaterArray.reduce(
    (sum, waterItem) => sum + waterItem.volume,
    0
  );

  console.log(totalVolume)
  const percentage = Math.round((totalVolume / dailyNorma) * 100);

  const showPercentage = percentage => {
    return (
      (percentage >= 10 && percentage <= 39) ||
      (percentage >= 57 && percentage <= 85)
    );
  };

  return (
    <div className={css.waterProgressBar}>
      <div className={css.today}>Today</div>
      <div className={css.progressContainer}>
        <div className={css.progressBar} style={{ width: `${percentage}%` }}>
          {showPercentage(percentage) && (
            <span className={css.progressLabel}>{percentage}%</span>
          )}
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
