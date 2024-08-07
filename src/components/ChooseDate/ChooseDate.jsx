import { useSelector } from 'react-redux';
import { selectDayItems } from '../../redux/water/selectors.js';
import css from '../ChooseDate/ChooseDate.module.css';

function ChooseDate() {
  const water = useSelector(selectDayItems);

  console.log(water);

  return <h3 className={css.date}>Today</h3>;
}

export default ChooseDate;
