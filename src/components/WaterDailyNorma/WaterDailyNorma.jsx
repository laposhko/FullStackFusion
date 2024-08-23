import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAuthUser } from "../../redux/auth/selectors";
import { getCurrentUserInformation } from "../../redux/auth/operations";
import { useTranslation } from "react-i18next";
import css from "./WaterDailyNorma.module.css";

export default function WaterDailyNorma() {
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCurrentUserInformation());
  },);

  const dailyNorma = user && user.dailyWaterNorm ? user.dailyWaterNorm : 1.5;

  return (
    <div className={css.container} data-tour="step-2">
      <p className={css.title}>
        {t("WaterMainInfo.WaterDailyNorma.amount", { count: dailyNorma })}
      </p>
      <p>user</p>
      <p className={css.text}>{t("WaterMainInfo.WaterDailyNorma.text")}</p>
    </div>
  );
}
