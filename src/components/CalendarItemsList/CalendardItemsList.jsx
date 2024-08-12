import { convertDateIntoStringFormat } from "../../helpers/convertDateFormatForActiveDay";
import CalendarItem from "../CalendarItem/CalendarItem";
import css from '../CalendarItemsList/CalendarItemsList.module.css'
import { useState } from 'react';

const CalendarItemsList = ({cards}) => {
    const formattedDate = convertDateIntoStringFormat(new Date());
    const [activeIndex, setActiveIndex] = useState(formattedDate);
    
    const handleClick = (index) => {
      setActiveIndex(index);
    };
   
    return (<ul className={css.container_for_items} >
        {cards.map((card, index) => {
            if(!card.volume) card.volume = 0;
            return (
                <li key={card.id} onClick={() => handleClick((card.formDate))}>
                    <CalendarItem formatDate={card.formDate} day={card.day} dayResult={card.volume} isActive={String(activeIndex) === card.formDate} onClick={() => handleClick(index)}/> 
                </li>
            )
        })}
    </ul>)
}

export default CalendarItemsList;