import css from './AddWaterBtn.module.css';
import SvgIcon from '../../img/icons/sprite'

export default function AddWaterBtn() {
    return(
        <div>
            <button className={css.btn} type='button' onClick={()=> console.log("Click Button")}>
                <SvgIcon
                    className={css.icon}
                    iconName="icon-close"
                    width={14}
                    height={14}    
                /> 
                Add water
            </button>
        </div>
    )
}