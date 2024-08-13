import css from "./TrackerPage.module.css";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import Modals from "../../components/Modal/ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectActiveDay } from "../../redux/water/selectors";
import { getWaterDayInfo } from "../../redux/water/operations";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
export default function TrackerPage() {
  const dispatch = useDispatch();
  const date = useSelector(selectActiveDay);
  useEffect(() => {
    dispatch(getWaterDayInfo(date));
  }, [dispatch, date]);

  return (
    <div className={css.pageContainer} data-tour="step-1" >
      <div className={css.sectionWrapper} data-tour="step-8">
        <WaterMainInfo />
        <WaterDetailedInfo></WaterDetailedInfo>
        {/* <div className={css.rightSectionWrapper}>
          <UserPanel />
          <DailyInfo />
          <Calendar></Calendar>
        </div> */}

        <Modals></Modals>
      </div>
    </div>
  );
}
