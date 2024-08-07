//  потрібно взяти масив карток з бекенду
// потрібно взяти dailyWaterNorm з бекенду
import CalendarItemsList from "../CalendarItemsList/CalendardItemsList";
import css from "../CalendarPagination/CalendarPagination.module.css";
import { useState } from "react";
import SvgIcon from "../../img/icons/sprite.jsx";
import { useSelector } from "react-redux";
import { selectMonthItems } from "../../redux/water/selectors.js";
import { selectCurrentUser } from "../../redux/users/selectors.js";

// const cards = [{
//     "_id": "66ad21159acfa4bd9e5cfd1f",
//     "volume": 150,
//     "date": "2024-08-02T21:00",
//     "userId": "66ad095ebb6eafe76d8d67d8"
//   }, {
//     "_id": "66ad21159acfa4bd9e5cfd1f",
//     "volume": 200,
//     "date": "2024-08-02T21:00",
//     "userId": "66ad095ebb6eafe76d8d67d8"
//   }, {
//     "_id": "66ad21159acfa4bd9e5cfd1f",
//     "volume": 200,
//     "date": "2024-08-02T21:00",
//     "userId": "66ad095ebb6eafe76d8d67d8"
//   },{
//     "_id": "66ad21159acfa4bd9e5cfd1f",
//     "volume": 200,
//     "date": "2024-08-03T21:00",
//     "userId": "66ad095ebb6eafe76d8d67d8"
//   },{
//     "_id": "66ad21159acfa4bd9e5cfd1f",
//     "volume": 200,
//     "date": "2024-08-04T21:00",
//     "userId": "66ad095ebb6eafe76d8d67d8"
//   },{
//     "_id": "66ad21159acfa4bd9e5cfd1f",
//     "volume": 200,
//     "date": "2024-08-04T21:00",
//     "userId": "66ad095ebb6eafe76d8d67d8"
//   },{
//     "_id": "66ad21159acfa4bd9e5cfd1f",
//     "volume": 200,
//     "date": "2024-08-04T21:00",
//     "userId": "66ad095ebb6eafe76d8d67d8"
//   },{
//     "_id": "66ad21159acfa4bd9e5cfd1f",
//     "volume": 200,
//     "date": "2024-08-04T21:00",
//     "userId": "66ad095ebb6eafe76d8d67d8"
//   },{
//     "_id": "66ad21159acfa4bd9e5cfd1f",
//     "volume": 200,
//     "date": "2024-08-04T21:00",
//     "userId": "66ad095ebb6eafe76d8d67d8"
//   },{
//     "_id": "66ad21159acfa4bd9e5cfd1f",
//     "volume": 200,
//     "date": "2024-08-04T21:00",
//     "userId": "66ad095ebb6eafe76d8d67d8"
//   },{
//     "_id": "66ad21159acfa4bd9e5cfd1f",
//     "volume": 600,
//     "date": "2024-08-04T21:00",
//     "userId": "66ad095ebb6eafe76d8d67d8"
//   }]

// const dailyWaterNorm = 1.5 * 1000;

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
  const cards = useSelector(selectMonthItems);
  const userInfo = useSelector(selectCurrentUser);
  const dailyWaterNorm = userInfo.dailyWaterNorm*1000;
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
    const itemDate = new Date(year, monthIndex, i);

    const formattedDay = String(itemDate.getDate()).padStart(2, "0");
    const formattedMonth = String(itemDate.getMonth() + 1).padStart(2, "0");
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    const userPerDayWater = cards.reduce((acc, card) => {
      if (card.date.includes(formattedDate)) {
        acc += card.volume;
      }
      return acc;
    }, 0);

    const userPercentage = Math.round((userPerDayWater / dailyWaterNorm) * 100);

    const userNorm = userPerDayWater > dailyWaterNorm ? "100" : userPercentage;

    arrOfDays.push({
      date: itemDate,
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
