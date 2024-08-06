import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import css from "./TrackerPage.module.css";
import UserPanel from "../../components/UserPanel/UserPanel";
import Calendar from "../../components/Calendar/Calendar";
import Modals from "../../components/Modal/ModalWindow";
export default function TrackerPage() {
  return (
    <div className={css.pageContainer}>
      <WaterMainInfo />
      <UserPanel />
      <Calendar></Calendar>
      <Modals></Modals>
    </div>
  );
}
