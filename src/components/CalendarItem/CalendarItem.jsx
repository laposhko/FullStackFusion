import css from '../CalendarItem/CalendarItem.module.css'

const lessThanFullNorm = (formatDate, day, dayResult, isActive, activeIndex) => {
    const date = new Date();
    const formattedDay =  String(date. getDate()). padStart(2,'0');
    const year = date.getFullYear();
    const formattedMonth = String(date. getMonth() + 1). padStart(2, '0');
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
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


const CalendarItem = ({formatDate, day, dayResult, isActive, activeIndex}) => {
    const styles = lessThanFullNorm(formatDate, day, dayResult, isActive, activeIndex);

    return (<div  className={css.container}>
        <button  className={styles}>{day}</button>
        <p className={css.text}>{dayResult}%</p>
    </div>)
};


export default CalendarItem;