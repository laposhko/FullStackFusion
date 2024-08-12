import Statistics from "../Statistics/Statistics.jsx"
import Calendar from "../Calendar/Calendar"
import { useState } from "react";
import SvgIcon from "../../img/icons/sprite.jsx";
import css from "./Monthinfo.module.css";

const ToggleComponent = () => {
    const [isComponentCalendar, setIsComponentCalendar] = useState(true);
  
    const handleToggle = () => {
      setIsComponentCalendar(!isComponentCalendar);
    };
  
    return (
      <div>
        <button onClick={handleToggle}>
          <SvgIcon
            className={css.closeIcon}
            iconName="icon-pie-chart-02"
            width={24}
            height={24}
          />
        </button>
  
        
        {isComponentCalendar ? <Calendar /> : <Statistics />}
      </div>
    );
  };
  
  export default ToggleComponent;