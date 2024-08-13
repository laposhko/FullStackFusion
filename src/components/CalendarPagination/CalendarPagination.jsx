import CalendarItemsList from '../CalendarItemsList/CalendardItemsList';
import Statistics from '../Statistics/Statistics.jsx';
import css from '../CalendarPagination/CalendarPagination.module.css';
import { useEffect, useState, useMemo } from 'react';
import SvgIcon from '../../img/icons/sprite.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonthItems } from '../../redux/water/selectors.js';
import { convertDateIntoStringFormat } from '../../helpers/convertDateFormatForActiveDay.jsx';
import { getWaterMonthInfo } from '../../redux/water/operations.js';
import { selectAuthUser } from '../../redux/auth/selectors.js';


const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const CalendarPagination = () => {
  const dispatch = useDispatch();

  const [isComponentCalendar, setIsComponentCalendar] = useState(true);

  // const [ToggleInfo, setToggleInfo] = useState(true);

  // const [selectedMonth, setSelectedMonth] = useState("08");

  // const handleMonthChange = (newMonth) => {
  //   setSelectedMonth(newMonth);
  // };

  const monthArray = useSelector(selectMonthItems);

  

  useEffect(() => {
    dispatch(getWaterMonthInfo());
  }, [dispatch]);

  const cards = useSelector(selectMonthItems);
  const userInfo = useSelector(selectAuthUser);
  const dailyWaterNorm = Number(userInfo.dailyWaterNorm) * 1000;
  const [date, setDate] = useState(new Date());

  const increaseDate = (currentDate) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setDate(newDate);
  };

  const decreaseDate = (currentDate) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    setDate(newDate);
  };
  const monthIndex = date.getMonth();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const numOfDays = (y, m) => new Date(y, m, 0).getDate();
  const daysOfMonth = numOfDays(year, monthIndex + 1);

  const arrOfDays = [];
  for (let i = 1; i <= daysOfMonth; i += 1) {
    const formattedDate = convertDateIntoStringFormat(
      new Date(year, monthIndex, i)
    );

    const userPerDayWater = cards.reduce((acc, card) => {
      if (card.date.includes(formattedDate)) {
        acc += card.volume;
      }
      return acc;
    }, 0);

    const userPercentage = Math.round((userPerDayWater / dailyWaterNorm) * 100);
    const userNorm = userPerDayWater > dailyWaterNorm ? '100' : userPercentage;

    arrOfDays.push({
      day: i,
      id: crypto.randomUUID(),
      volume: userNorm,
      formDate: formattedDate,
    });
  }



  const formattedMonthArray = useMemo(() => {

    const filteredMonthArray = monthArray.filter(day => {
      const selectedMonth = day.date.split("-")[1]; // отримуємо місяць з дати
      return selectedMonth === String(monthIndex + 1).padStart(2, "0"); // звіряємо з вибраним місяцем
    });


    const groupedByDate = filteredMonthArray.reduce((acc, day) => {
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
  }, [monthArray, monthIndex]);


  //   const handleToggleInfo = () => {
  //     setToggleInfo(!ToggleInfo);
  //   };

  const handleToggle = () => {
    setIsComponentCalendar(!isComponentCalendar);
    
  };



  return (
    <div className={css.container}>
      <div className={css.upper_part_container}>
        <p className={css.text_leftside}>
          {isComponentCalendar ? "Month" : "Statistics"}
        </p>
        <div className={css.right_side_container}>
          <button className={css.btn} onClick={() => decreaseDate(date)}>
            {'<'}
          </button>
          <p className={css.text_rightside}>
            {month}, {year}
          </p>
          <button className={css.btn} onClick={() => increaseDate(date)}>
            {'>'}
          </button>
          <button onClick={handleToggle}>
            <SvgIcon
              className={css.closeIcon}
              iconName="icon-pie-chart-02"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
  


      {isComponentCalendar ? (
      <CalendarItemsList cards={arrOfDays} />
    ) : (
      <Statistics data={formattedMonthArray} />
    )}
  </div>
);
}

export default CalendarPagination;
