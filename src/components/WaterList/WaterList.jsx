import WaterItem from '../WaterItem/WaterItem';
import css from '../WaterList/WaterList.module.css';

function WaterList() {

  const waterEntries = useSelector(selectDayItems);

  // const waterEntries = [1, 2, 3, 4, 5, 6, 7];


  return (
    <div className={css.waterInfo}>
      {/* <p>Empty 😥</p> */}
      <ul className={css.waterList}>
        <WaterItem />
      </ul>
    </div>
  );
}

export default WaterList;
