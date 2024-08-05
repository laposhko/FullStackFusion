import clsx from 'clsx';
import css from './AddWaterBtn.module.css';
import SvgIcon from '../../img/icons/sprite'

export default function AddWaterBtn({isDefault = true}) {
    return(
        <div>
            <button className={clsx(css.btn, {
                        [css.btn__Default]: isDefault,
                        [css.btn__Active]: !isDefault,
                    })} type='button' onClick={()=> console.log("Click Button")}>
                <SvgIcon
                    className={clsx(css.icon, {
                        [css.icon__Default]: isDefault,
                        [css.icon__Active]: !isDefault,
                    })}
                    iconName="icon-close"
                    width="14"
                    height="14"    
                /> 
                Add water
            </button>
        </div>
    )
}