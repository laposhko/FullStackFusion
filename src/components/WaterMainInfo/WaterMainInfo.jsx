import Logo from "../Logo/Logo";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import css from "./WaterMainInfo.module.css";
import style from "../AddWaterBtn/AddWaterBtn.module.css";
import bottle1d from "../../img/TrackerPage/bottle-for-water-desktop.png";
import bottle2d from "../../img/TrackerPage/bottle-for-water-desktop@2x.png";
import bottle1m from "../../img/TrackerPage/bottle-for-water-mobile.png";
import bottle2m from "../../img/TrackerPage/bottle-for-water-mobile@2x.png";
import bottle1t from "../../img/TrackerPage/bottle-for-water-tablet.png";
import bottle2t from "../../img/TrackerPage/bottle-for-water-tablet@2x.png";
import ReactourBtn from "../Reactour/ReactourBtn/ReactourBtn";
import { useTranslation } from "react-i18next";

export default function WaterMainInfo() {
  const { t } = useTranslation();

  return (
    <div className={css.mainInfoContainer}>
      <Logo></Logo>
      <WaterDailyNorma></WaterDailyNorma>
      <WaterProgressBar></WaterProgressBar>
      <AddWaterBtn className={style.addBtnStyle1}></AddWaterBtn>
      <img
        src={bottle1m}
        srcSet={`
                    ${bottle1m} 262w,
                    ${bottle2m} 524w,
                    ${bottle1t} 374w,
                    ${bottle2t} 748w,
                    ${bottle1d} 472w,
                    ${bottle2d} 944w
                `}
        sizes="
                    (min-width: 1280px) 472px,
                    (min-width: 768px) 374px,
                    100vw
                "
        alt={t("WaterMainInfo.alt")}
        className={css.waterBottle}
        loading="lazy"
      />
      <ReactourBtn />
    </div>
  );
}
