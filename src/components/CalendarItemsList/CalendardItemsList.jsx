import CalendarItem from "../CalendarItem/CalendarItem";
import css from '../CalendarItemsList/CalendarItemsList.module.css'
import { useState } from 'react';

const CalendarItemsList = ({cards}) => {
    const date = new Date();
    const formattedDay =  String(date. getDate()). padStart(2,'0');
    const year = date.getFullYear();
    const formattedMonth = String(date. getMonth() + 1). padStart(2, '0');
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    const [activeIndex, setActiveIndex] = useState(formattedDate);

    const handleClick = (index) => {
      setActiveIndex(index);
    };
   
    return (<ul className={css.container_for_items}>
        {cards.map((card, index) => {
  
            return (
                <li key={card.id} onClick={() => handleClick((card.formDate))}>
                    <CalendarItem formatDate={card.formDate} day={card.day} dayResult={card.volume} isActive={String(activeIndex) === card.formDate} activeIndex={String(activeIndex)}  onClick={() => handleClick(index)}/> 
                </li>
            )
        })}
    </ul>)
}

export default CalendarItemsList;