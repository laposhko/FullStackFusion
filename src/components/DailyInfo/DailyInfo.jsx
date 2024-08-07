import ChooseDate from '../ChooseDate/ChooseDate';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterList from '../WaterList/WaterList';

import css from '../DailyInfo/DailyInfo.module.css';
import style from '../AddWaterBtn/AddWaterBtn.module.css';

function DailyInfo() {
  return (
    <div className={css.wrapper}>
      <div className={css.infoWrapper}>
        <ChooseDate />
        <AddWaterBtn className={style.addBtnStyle2}></AddWaterBtn>
      </div>
      <WaterList />
    </div>
  );
}

export default DailyInfo;
