import WaterItem from '../WaterItem/WaterItem';
import css from '../WaterList/WaterList.module.css';

function WaterList() {
  return (
    <div className={css.waterInfo}>
      {/* <p>Empty 😥</p> */}
      <ul className={css.waterList}>
        <WaterItem />
        <WaterItem />
      </ul>
    </div>
  );
}

export default WaterList;
