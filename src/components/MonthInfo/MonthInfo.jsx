import Statistics from "../Statistics/Statistics.jsx";
import Calendar from "../Calendar/Calendar";
// import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import { useState, useMemo } from "react";
import SvgIcon from "../../img/icons/sprite.jsx";
import css from "./Monthinfo.module.css";
import { useSelector } from "react-redux";
import { selectMonthItems } from "../../redux/water/selectors.js";

const ToggleComponent = () => {
  const [isComponentCalendar, setIsComponentCalendar] = useState(true);
  const [ToggleInfo, setToggleInfo] = useState(true);

//   const handleToggleInfo = () => {
//     setToggleInfo(!ToggleInfo);
//   };

  const handleToggle = () => {
    setIsComponentCalendar(!isComponentCalendar);
    setToggleInfo(!ToggleInfo);
  };

  // const monthArray = useSelector(selectWaterAmountForDay);
  // const waterState = useSelector(selectWaterState);



  
  const monthArray = useSelector(selectMonthItems);

//   console.log(monthArray);

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
    const unsortedArray = Object.keys(groupedByDate).map((date) => {
      return {
        date: date.split("-")[2], // Отримуємо день місяця з дати
        value: Math.floor(groupedByDate[date]),
      };
    });
  
    // Сортуємо масив за датами
    const sortedArray = unsortedArray.sort((a, b) => a.date - b.date);
  
    return sortedArray;
  }, [monthArray]);

  return (
    <div>

<div className={css.wrapper}>
        <div className={css.thead}>
          <h3 className={css.title}>
            {ToggleInfo ? "Month" : "Statistics"}
          </h3>
          {/* <div className={css.pagination}>
            <CalendarPagination
            //   onNextMonth={onNextMonth}
            //   onPrevMonth={onPrevMonth}
            //   currentDate={currentMonth}
            //   onTodayClick={handleTodayClick}
            /> */}


      <button onClick={handleToggle}>
        <SvgIcon
          className={css.closeIcon}
          iconName="icon-pie-chart-02"
          width={24}
          height={24}
        />
      </button>

</div>
          </div>

      {isComponentCalendar ? (
        <Calendar />
      ) : (
        <Statistics data={formattedMonthArray} />
      )}
    </div>
    // </div>
  );
};

export default ToggleComponent;
