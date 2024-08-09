import { useSelector } from 'react-redux';

import WaterItem from '../WaterItem/WaterItem';
import css from '../WaterList/WaterList.module.css';

import { selectDayItems } from '../../redux/water/selectors';

function WaterList() {
  // const waterEntries = useSelector(selectDayItems);

  const waterEntries = [1, 2, 3, 4, 5, 6, 7];

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
