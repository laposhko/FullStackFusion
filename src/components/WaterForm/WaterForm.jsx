// import toast from "react-hot-toast";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch, useSelector } from "react-redux";
// import { icons as sprite } from "../../img/icons/sprite.svg";
// import { createCard, updateCard } from "../../redux/water/operations";
// import { selectActiveDay } from "../../redux/selectors";
// import { convertDateFormatForActiveDay } from "../../helpers/convertDateFormatForActiveDay";
import css from "./WaterForm.module.css";

const schema = Yup.object().shape({
  waterValue: Yup.number()
    .min(50, "The value must be at least 50 ml")
    .max(1500, "The value must be at most 1500 ml")
    .positive("The number must be a positive value")
    .required("Value is required"),
  localTime: Yup.string().required("Time is required"),
});

const getTimeFormat = () => {
  const date = new Date();
  const hours = date.getHours();
  const min = date.getMinutes();

  const timeFormatting =
    hours.toString().padStart(2, "0") + ":" + min.toString().padStart(2, "0");

  return timeFormatting;
};

const WaterForm = ({ mode, onClose, water = {} }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      waterValue: Number(water.amount) || 50,
      localTime: water.time || getTimeFormat(),
    },
  });
  //цей селектор повинен додати Артем
  // const activeDay = useSelector(selectActiveDay);
  // const dispatch = useDispatch();

  const handleClickMinus = () => {
    const current = getValues("waterValue");
    setValue("waterValue", current - 50, 50);
  };

  const handleClickPlus = () => {
    const current = getValues("waterValue");
    setValue("waterValue", current + 50, 1500);
  };

  const onSubmit = () => {
    //   const newData = {
    //     localDate: convertDateFormatForActiveDay(activeDay),
    //     waterValue: watch("waterValue"),
    //     localTime: watch("localTime"),
    //   };
    //   try {
    //     if (mode === "add") {
    //       dispatch(createCard(newData));
    //       toast.success(
    //         `The amount of water consumed has been added successfully.`
    //       );
    //     } else if (mode === "edit") {
    //       dispatch(updateCard({ _id: water._id, ...newData }));
    //       toast.success(
    //         "The amount of water consumed has been successfully updated."
    //       );
    //     }
    //     onClose();
    //   } catch (error) {
    //     toast.error("Failed to save water data. Please try again.");
    //   }
  };

  const handleBlur = () => {
    const current = getValues("waterValue");
    if (current < 50) {
      setValue("waterValue", 50);
    } else if (current > 1500) {
      setValue("waterValue", 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className={css.amountTitle}>Amount of water:</p>
      <div className={css.amountWrap}>
        <button
          type="button"
          className={css.quantityBtn}
          onClick={handleClickMinus}
          disabled={getValues("waterValue") === 50}
        >
          {/* //немає іконки мінус */}
          {/* <svg className={css.quantityIcon}>
            <use xlinkHref={`${sprite}#icon-minus-40x40`}></use>
          </svg> */}
        </button>
        <span className={css.amountValue}>
          {watch("waterValue") >= 999
            ? `${(Math.round((watch("waterValue") / 1000) * 100) / 100).toFixed(
                2
              )} L`
            : `${watch("waterValue")} ml`}
        </span>
        <button
          type="button"
          className={css.quantityBtn}
          onClick={handleClickPlus}
          disabled={getValues("waterValue") === 1500}
        >
          {/* <svg className={css.quantityIcon}>
            <use xlinkHref={`${sprite}#icon-plus-40x40`}></use>
          </svg> */}
        </button>
      </div>

      <div>
        <div className={css.valueDiv}>
          <label className={css.labelTime} htmlFor="localTime">
            Recording time:
          </label>
          <input
            {...register("localTime")}
            className={css.input}
            type="time"
            name="localTime"
            id="localTime"
          />
          {errors.localTime && (
            <span className={css.error}>{errors.localTime.message}</span>
          )}
        </div>

        <div className={css.valueDiv}>
          <label className={css.labelVal} htmlFor="value">
            Enter the value of the water used:
          </label>
          <input
            {...register("waterValue")}
            className={css.input}
            step={50}
            name="value"
            id="value"
            onChange={(e) =>
              setValue(
                "waterValue",
                isNaN(e.target.value) ? 0 : Math.max(Number(e.target.value), 0)
              )
            }
            onBlur={handleBlur}
          />
          {errors.waterValue && (
            <span className={css.error}>{errors.waterValue.message}</span>
          )}
        </div>
      </div>
      <button className={css.btnSubmit} type="submit">
        Save
      </button>
    </form>
  );
};

export default WaterForm;
