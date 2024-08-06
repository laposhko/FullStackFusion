import CalendarPagination from "../CalendarPagination/CalendarPagination"
import css from '../Calendar/Calendar.module.css'

const Calendar = () => {
    return ( <div className={css.container}>
    <CalendarPagination />
  </div>)
};

export default Calendar;