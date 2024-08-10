import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAuthUser } from "../../redux/auth/selectors";
import { getCurrentUserInformation } from "../../redux/auth/operations";
import css from "./WaterDailyNorma.module.css";

export default function WaterDailyNorma() {
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserInformation());
  }, [dispatch]);

  const dailyNorma = user && user.dailyWaterNorm ? user.dailyWaterNorm : 1.5;

  return (
    <div className={css.container}>
      <p className={css.title}>{dailyNorma} L</p>
      <p className={css.text}>My daily norma</p>
    </div>
  );
}
