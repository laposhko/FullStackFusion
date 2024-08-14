import UserPanel from "../UserPanel/UserPanel";
import DailyInfo from "../DailyInfo/DailyInfo";
import Calendar from "../Calendar/Calendar";
import css from "./WaterDetailedInfo.module.css";
// import ToggleComponent from "../MonthInfo/MonthInfo";
import Languages from "../Languages/Languages";
export default function WaterDetailedInfo() {
  return (
    <div className={css.rightSectionWrapper}>
      <UserPanel />
      <DailyInfo />
      <Calendar />
      <Languages></Languages>
      {/* <ToggleComponent/> */}
    </div>
  );
}
