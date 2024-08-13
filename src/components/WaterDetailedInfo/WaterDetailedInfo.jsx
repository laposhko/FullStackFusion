import UserPanel from "../UserPanel/UserPanel";
import DailyInfo from "../DailyInfo/DailyInfo";
import Calendar from "../Calendar/Calendar";
import css from "./WaterDetailedInfo.module.css";

export default function WaterDetailedInfo() {
  return (
    <div className={css.rightSectionWrapper}>
      <UserPanel />
      <DailyInfo />
      <Calendar />
    </div>
  );
}
