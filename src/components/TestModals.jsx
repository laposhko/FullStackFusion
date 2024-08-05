import { useModalContext } from '../context/useModalContext.jsx';
// import { icons as sprite } from '../../../../shared/icons/index.js';
import sprite from './../../img/icons/sprite.svg';


import DeleteWaterModal from '../../../Modals/DeleteWaterModal/DeleteWaterModal.jsx';
import css from './TestModals.module.css';

function WaterItem({data}) {

    const { openModal } = useModalContext();

    const { _id: id } = data;

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
  
   