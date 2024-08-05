import { useModalContext } from '../context/useModalContext.jsx';
// import { icons as sprite } from '../../../../shared/icons/index.js';
import sprite from '../img/icons/sprite.svg';


import DeleteWaterModal from '../components/DeleteWaterModal/DeleteWaterModal.jsx';
import css from './TestModals.module.css';

function WaterItem({id}) {

    const { openModal } = useModalContext();

    // const id = 1;

    return (
   
        <div className={css.btns}>
          
          <button
            className={css.btn}
            onClick={() => {
              openModal(<DeleteWaterModal onDelete={id} />);
            }}
          >
            <svg className="icon icon-trash">
              <use xlinkHref={`${sprite}#icon-trash`}></use>
            </svg>
          </button>
        </div>
    )
    }

    export default WaterItem;
  
   