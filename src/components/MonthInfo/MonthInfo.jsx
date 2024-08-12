import Statistics from "../Statistics/Statistics.jsx"
import Calendar from "../Calendar/Calendar"
import { useState, useMemo } from "react";
import SvgIcon from "../../img/icons/sprite.jsx";
import css from "./Monthinfo.module.css";
import { useSelector } from "react-redux";
import { selectMonthWaterAmount } from "../../redux/water/selectors.js";



const ToggleComponent = () => {
    const [isComponentCalendar, setIsComponentCalendar] = useState(true);
  
    const handleToggle = () => {
      setIsComponentCalendar(!isComponentCalendar);
    };
  
    const monthArray = useSelector(selectMonthWaterAmount);

    const formattedMonthArray = useMemo(() => {
        return monthArray.map((day) => {
            const dateParts = day.day ? day.day.split('-') : [];
            return {
              id: day.id,
              date: dateParts.length === 3 ? dateParts[2] : 'Invalid Date',
              value: Math.floor(Number(day.totalAmount) * 1000),
            };
          });
        }, [monthArray]);

    return (
      <div>
        <button onClick={handleToggle}>
          <SvgIcon
            className={css.closeIcon}
            iconName="icon-pie-chart-02"
            width={24}
            height={24}
          />
        </button>
  
        
        {isComponentCalendar ? (
        <Calendar />
      ) : (
        <Statistics data={formattedMonthArray} />
      )}

      </div>
    );
  };
  
  export default ToggleComponent;