import svg from '../../img/icons/sprite.svg';
import css from '../WaterItem/WaterItem.module.css';

import { useModalContext } from '../../context/useModalContext';
import WaterModal from '../WaterModal/WaterModal';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal';

function WaterItem() {
  const { openModal } = useModalContext();

  return (
    <div className={css.waterItem}>
      <svg className={css.icon}>
        <use href={`${svg}#icon-trash`}></use>
      </svg>
      <div className={css.info}>
        <p className={css.infoMl}>50 ml</p>
        <p className={css.infoTime}>10:06 PM</p>
      </div>
      <div className={css.btnsWrapper}>
        <button
          className={css.btn}
          onClick={() => {
            openModal(<WaterModal />);
          }}
        >
          <svg className={css.svg}>
            <use href={`${svg}#icon-Vector`}></use>
          </svg>
        </button>
        <button
          className={css.btn}
          onClick={() => {
            openModal(<DeleteWaterModal />);
          }}
        >
          <svg className={css.svg}>
            <use href={`${svg}#icon-trash`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default WaterItem;
