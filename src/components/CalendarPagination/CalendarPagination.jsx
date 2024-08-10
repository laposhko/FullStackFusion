import CalendarItemsList from "../CalendarItemsList/CalendardItemsList";
import css from "../CalendarPagination/CalendarPagination.module.css";
import { useEffect, useState } from "react";
import SvgIcon from "../../img/icons/sprite.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectMonthItems } from "../../redux/water/selectors.js";
import { convertDateIntoStringFormat } from "../../helpers/convertDateFormatForActiveDay.jsx";
import { getWaterMonthInfo } from "../../redux/water/operations.js";
import { selectAuthUser } from "../../redux/auth/selectors.js";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CalendarPagination = () => {
  const dispatch = useDispatch();

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
    const userNorm = userPerDayWater > dailyWaterNorm ? "100" : userPercentage;

    arrOfDays.push({
      day: i,
      id: crypto.randomUUID(),
      volume: userNorm,
      formDate: formattedDate,
    });
  }

  return (
    <div className={css.container}>
      <div className={css.upper_part_container}>
        <p className={css.text_leftside}>Month</p>
        <div className={css.right_side_container}>
          <button className={css.btn} onClick={() => decreaseDate(date)}>
            {"<"}
          </button>
          <p className={css.text_rightside}>
            {month}, {year}
          </p>
          <button className={css.btn} onClick={() => increaseDate(date)}>
            {">"}
          </button>
          <button>
            <SvgIcon
              className={css.closeIcon}
              iconName="icon-pie-chart-02"
              width={24}
              height={24}
            ></SvgIcon>
          </button>
        </div>
      </div>

      <div>
        <CalendarItemsList cards={arrOfDays} />
      </div>
    </div>
  );
};

export default CalendarPagination;
