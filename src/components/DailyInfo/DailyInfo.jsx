import ChooseDate from '../ChooseDate/ChooseDate';
// import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterList from '../WaterList/WaterList';

import css from '../DailyInfo/DailyInfo.module.css';

function DailyInfo() {
  return (
    <div className={css.wrapper}>
      <div className={css.infoWrapper}>
        <ChooseDate />
        {/* <AddWaterBtn /> */}
      </div>
      <WaterList />
    </div>
  );
}

export default DailyInfo;
