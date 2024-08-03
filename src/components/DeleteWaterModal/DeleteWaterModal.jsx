import { useModalContext } from '../../context/useModalContext';

import css from './DeleteWaterModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

// import { selectMonth, selectDate } from '../../redux/water/selectors';
import {
    deleteCard,
  apiGetWaterMonth,
  apiGetWaterDay,
} from '../../redux/water/operations';



const DeleteWaterModal = ({ onDelete }) => {

  const { closeModal } = useModalContext();
  const dispatch = useDispatch();

//   const selectedDate = useSelector(selectDate);
//   const currentMonth = useSelector(selectMonth);

  const handleDelete = async () => {
    try {
      await dispatch(deleteCard(onDelete));
      closeModal();
      toast.success('Entry deleted successfully');

    //   dispatch(apiGetWaterDay(selectedDate));

    //   if (
    //     Number(selectedDate.split('-')[0]) === currentMonth.year &&
    //     Number(selectedDate.split('-')[1]) === currentMonth.month
    //   ) {
    //     dispatch(apiGetWaterMonth(currentMonth));
    //   }

    } catch (error) {
      toast.error('Failed to delete the entry');
    }
  };

  return (
    <div className={css.deleteModalBackground}>
      <h2 className={css.title}>Delete entry</h2>
      <p className={css.paragraf}>Are you sure you want to delete the entry?</p>
      <div className={css.buttons}>
        <button
          className={css.buttondelete}
          onClick={handleDelete}
          type="button"
        >
          Delete
        </button>
        <button className={css.buttoncancel} onClick={closeModal} type="button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;