import { useDispatch } from 'react-redux';
import { convertDateIntoStringFormat } from '../../helpers/convertDateFormatForActiveDay';
import css from '../CalendarItem/CalendarItem.module.css'
import { setActiveDay } from '../../redux/water/slice';

const lessThanFullNorm = (formatDate, dayResult, isActive) => {
    const formattedDate = convertDateIntoStringFormat(new Date());

    if(formattedDate == formatDate ){
        if(isActive) {
            return `${css.btn} ${css.active}`
        }
        return `${css.btn} ${css.today}`
    }
    
    if(isActive) {
        return `${css.btn} ${css.active}`
    }

    
    if(dayResult < 100) {
        return `${css.btn} ${css.not_reached_goal}`
    }
    
    if(dayResult >= 100) {
        return `${css.btn} ${css.reached_goal}`
    }

    return `${css.btn}`;
};



const CalendarItem = ({formatDate, day, dayResult, isActive}) => {
    const styles = lessThanFullNorm(formatDate, dayResult, isActive);
    const dispatch = useDispatch();

    const handleClick = (e) => {
        dispatch(setActiveDay(e.target.value));
    };

    return (<div  className={css.container}  >
        <button value={formatDate} className={styles} onClick={(e) => handleClick(e)}>{day}</button>
        <p className={css.text}>{dayResult}%</p>
    </div>)
};


export default CalendarItem;