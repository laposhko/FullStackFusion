import clsx from 'clsx';
import style from './AddWaterBtn.module.css';
import SvgIcon from '../../img/icons/sprite';
import { useModalContext } from '../../context/useModalContext';
import WaterModal from '../WaterModal/WaterModal';

export default function AddWaterBtn({ className }) {
  const { openModal } = useModalContext();
  return (
    <div>
      <button
        className={clsx(style.btn, className)}
        type="button"
        onClick={() => {
          openModal(<WaterModal mode="add"></WaterModal>);
        }}
      >
        <div className={style.iconWrapper}>
          <SvgIcon
            className={style.icon}
            iconName="icon-close"
            width={14}
            height={14}
          />
        </div>
        Add water
      </button>
    </div>
  );
}
