import Tour from '@reactour/tour';
import steps from '../reacTourSteps.js';
import { useTour } from '@reactour/tour';
import { GiBookmarklet } from "react-icons/gi";
import css from './ReactourBtn.module.css';

const ReactourBtn = () => {
    const  { setIsOpen }  =  useTour ( ) 
  
    return (
      <div>
        <button className={css.btn} onClick={() => setIsOpen(true)}><GiBookmarklet style={{
            fontSize: '30px',  
            color: '#f0eff4',
            background: '#9be1a0'  
          }}  /></button>
        <Tour
          steps={steps}
          onRequestClose={() => setIsOpen(false)}
        />
      </div>
    );
  };
  
  export default ReactourBtn;
  