import { useModalContext } from "../../context/useModalContext";

import css from "./DeleteWaterModal.module.css";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
// import {  useSelector }
// import { selectMonth, selectDate } from '../../redux/water/selectors';
import { deleteCard } from "../../redux/water/operations";
import { useTranslation } from "react-i18next";

// import {

//   apiGetWaterMonth,
//   apiGetWaterDay,
// } from '../../redux/water/operations';

const DeleteWaterModal = ({ cardId }) => {
  const { closeModal } = useModalContext();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //   const selectedDate = useSelector(selectDate);
  //   const currentMonth = useSelector(selectMonth);

  const handleDelete = async () => {
    try {
      await dispatch(deleteCard(cardId));
      closeModal();
      toast.success(t("DeleteWaterModal.success"));

      //   dispatch(apiGetWaterDay(selectedDate));

      //   if (
      //     Number(selectedDate.split('-')[0]) === currentMonth.year &&
      //     Number(selectedDate.split('-')[1]) === currentMonth.month
      //   ) {
      //     dispatch(apiGetWaterMonth(currentMonth));
      //   }
    } catch (error) {
      toast.error(t("DeleteWaterModal.error"));
    }
  };

  return (
    <div className={css.deleteModalBackground}>
      <h2 className={css.title}>{t("DeleteWaterModal.title")}</h2>
      <p className={css.paragraf}>{t("DeleteWaterModal.text")}</p>
      <div className={css.buttons}>
        <button
          className={css.buttondelete}
          onClick={handleDelete}
          type="button"
        >
          {t("DeleteWaterModal.delete")}
        </button>
        <button className={css.buttoncancel} onClick={closeModal} type="button">
          {t("DeleteWaterModal.cancel")}
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
