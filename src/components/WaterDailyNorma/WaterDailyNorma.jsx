import { useSelector } from "react-redux";
import { selectAuthUser } from "../../redux/auth/selectors";
import css from "./WaterDailyNorma.module.css";

export default function WaterDailyNorma() {
  const user = useSelector(selectAuthUser);
  const waterNorma = user.dailyWaterNorm ? user.dailyWaterNorm : 1.5;
  //   console.log("User:", user);
  //   console.log("WaterNorma:", waterNorma);
  return (
    <div className={css.container}>
      <p className={css.title}>{waterNorma} L</p>
      <p className={css.text}>My daily norma</p>
    </div>
  );
}
