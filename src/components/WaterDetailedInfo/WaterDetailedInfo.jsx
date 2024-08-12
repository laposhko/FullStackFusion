import UserPanel from "../UserPanel/UserPanel";
import DailyInfo from "../DailyInfo/DailyInfo";
import Calendar from "../Calendar/Calendar";
import css from "./WaterDetailedInfo.module.css";
import ToggleComponent from "../MonthInfo/MonthInfo";

export default function WaterDetailedInfo() {
  return (
    <div className={css.rightSectionWrapper}>
      <UserPanel />
      <DailyInfo />
      <Calendar></Calendar>
      <ToggleComponent/>
    </div>
  );
}
