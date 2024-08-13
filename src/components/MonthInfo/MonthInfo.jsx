import Statistics from "../Statistics/Statistics.jsx";
import Calendar from "../Calendar/Calendar";
import { useState, useMemo } from "react";
import SvgIcon from "../../img/icons/sprite.jsx";
import css from "./Monthinfo.module.css";
import { useSelector } from "react-redux";
import { selectMonthItems } from "../../redux/water/selectors.js";

const ToggleComponent = () => {
  const [isComponentCalendar, setIsComponentCalendar] = useState(true);

  const handleToggle = () => {
    setIsComponentCalendar(!isComponentCalendar);
  };

  // const monthArray = useSelector(selectWaterAmountForDay);
  // const waterState = useSelector(selectWaterState);

  const monthArray = useSelector(selectMonthItems);

  console.log(monthArray);

  const formattedMonthArray = useMemo(() => {
    const groupedByDate = monthArray.reduce((acc, day) => {
      const dayPart = day.date.split(" ")[0]; // Отримуємо лише частину з датою "YYYY-MM-DD"
      if (!acc[dayPart]) {
        acc[dayPart] = 0;
      }
      acc[dayPart] += Number(day.volume);
      return acc;
    }, {});

    // Перетворюємо об'єкт у масив, де кожен елемент містить дату та суму об'ємів за цей день
    return Object.keys(groupedByDate).map((date) => {
      return {
        date: date.split("-")[2], // Отримуємо день місяця з дати
        value: Math.floor(groupedByDate[date]), 
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
