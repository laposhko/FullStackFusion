import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { createCard, updateCard } from "../../redux/water/operations";
import { toast } from "react-toastify";
import { useModalContext } from "../../context/useModalContext";
import { selectActiveDay } from "/src/redux/water/selectors.js";
import { useTranslation } from "react-i18next";
import SvgIcon from "../../img/icons/sprite";
import css from "./WaterForm.module.css";

const getTimeFormat = () => {
  const date = new Date();
  const hours = date.getHours();
  const min = date.getMinutes();

  const timeFormatting =
    hours.toString().padStart(2, "0") + ":" + min.toString().padStart(2, "0");

  return timeFormatting;
};

const WaterForm = ({ mode, water }) => {
  const { closeModal } = useModalContext();
  const { t } = useTranslation();
  let waterTime;
  if (water.date) {
    waterTime = water.date.split(" ")[1];
  }
  const schema = Yup.object().shape({
    waterValue: Yup.number()
      .min(50, t("WaterForm.waterValueMin"))
      .max(1500, t("WaterForm.waterValueMax"))
      .positive(t("WaterForm.waterValuePositive"))
      .required(t("WaterForm.waterValueRequired")),
    localTime: Yup.string().required(t("WaterForm.localTimeRequired")),
  });
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
      waterValue: Number(water.volume) || 50,
      localTime: waterTime || getTimeFormat(),
    },
  });
  const activeDay = useSelector(selectActiveDay);
  const dispatch = useDispatch();

  const handleClickMinus = () => {
    const current = getValues("waterValue");
    setValue("waterValue", current - 50, 50);
  };

  const handleClickPlus = () => {
    const current = getValues("waterValue");
    setValue("waterValue", current + 50, 1500);
  };

  const onSubmit = () => {
    const newData = {
      volume: watch("waterValue"),
      date: `${activeDay} ${watch("localTime")}`,
    };

    try {
      if (mode === "add") {
        dispatch(createCard(newData));
        toast.success(t("WaterForm.addSuccess"));
      } else if (mode === "edit") {
        dispatch(updateCard({ _id: water._id, ...newData }));
        toast.success(t("WaterForm.editSuccess"));
      }
      closeModal();
    } catch (error) {
      toast.error(t("WaterForm.error"));
    }
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
      <p className={css.amountTitle}>{t("WaterForm.title")}</p>
      <div className={css.amountWrap}>
        <button
          type="button"
          className={css.quantityBtn}
          onClick={handleClickMinus}
          disabled={getValues("waterValue") === 50}
        >
          <SvgIcon
            className={css.quantityIcon}
            iconName="icon-minus"
            width={43}
            height={43}
          ></SvgIcon>
        </button>
        <span className={css.amountValue}>
          {watch("waterValue") >= 999
            ? `${(Math.round((watch("waterValue") / 1000) * 100) / 100).toFixed(
                2
              )} ${t("WaterForm.l")}`
            : `${watch("waterValue")} ${t("WaterForm.ml")}`}
        </span>
        <button
          type="button"
          className={css.quantityBtn}
          onClick={handleClickPlus}
          disabled={getValues("waterValue") === 1500}
        >
          <SvgIcon
            className={css.quantityIconPlus}
            iconName="icon-plus"
            width={43}
            height={43}
          />
        </button>
      </div>
      <div>
        <div className={css.valueDiv}>
          <label className={css.labelTime} htmlFor="localTime">
            {t("WaterForm.record")}
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
            {t("WaterForm.value")}
          </label>
          <input
            {...register("waterValue")}
            className={css.input}
            // step={50}
            name="value"
            id="value"
            // defaultValue={mode === "edit" ? water.volume : ""}
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
        {t("WaterForm.save")}
      </button>
    </form>
  );
};

export default WaterForm;
