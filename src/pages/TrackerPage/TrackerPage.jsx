import UserPanel from "../../components/UserPanel/UserPanel";
import DailyInfo from "../../components/DailyInfo/DailyInfo";
import css from "./TrackerPage.module.css";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import Calendar from "../../components/Calendar/Calendar";
import Modals from "../../components/Modal/ModalWindow";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { getCurrentUserInformation } from "../../redux/auth/operations";
export default function TrackerPage() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getCurrentUserInformation());
  // }, [dispatch]);
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
