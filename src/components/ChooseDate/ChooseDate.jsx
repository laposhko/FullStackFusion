import { useSelector } from "react-redux";
import { selectActiveDay } from "../../redux/water/selectors.js";
import css from "../ChooseDate/ChooseDate.module.css";
import formatDate from "../../helpers/formatDate.js";
function ChooseDate() {
  const day = useSelector(selectActiveDay);

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const today = new Date();

  //   if (
  //     date.getDate() === today.getDate() &&
  //     date.getMonth() === today.getMonth() &&
  //     date.getFullYear() === today.getFullYear()
  //   ) {
  //     return 'Today';
  //   }
  //   const day = date.getDate();
  //   const month = date.toLocaleString('eng', { month: 'long' });

  //   return `${day}, ${month}`;
  // };

  return <h3 className={css.date}>{formatDate(day)}</h3>;
}

export default ChooseDate;
