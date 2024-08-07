import UserPanel from '../../components/UserPanel/UserPanel';
import DailyInfo from '../../components/DailyInfo/DailyInfo';
import css from './TrackerPage.module.css';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import Calendar from '../../components/Calendar/Calendar';
import Modals from '../../components/Modal/ModalWindow';

export default function TrackerPage() {
  return (
    <div className={css.pageContainer}>
      <div className={css.sectionWrapper}>
        <WaterMainInfo />
        <div className={css.rightSectionWrapper}>
          <UserPanel />
          <DailyInfo />
          <Calendar></Calendar>
        </div>

        <Modals></Modals>
      </div>
    </div>
  );
}
