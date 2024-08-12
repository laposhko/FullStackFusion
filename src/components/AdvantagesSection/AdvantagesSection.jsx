import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  selectUsersQuantity,
  selectUsersIsLoading,
  selectUsersIsError,
} from "../../redux/users/selectors.js";
import { getAllUsers } from "../../redux/users/operations.js";
import imageCustomerGirlMob1x from "../../img/HomePage/male-memojis-first-girl-mobile.png";
import imageCustomerGirlMob2x from "../../img/HomePage/male-memojis-first-girl-mobile@2x.png";
import imageCustomerGirlTabDesk1x from "../../img/HomePage/male-memojis-first-girl-desktop-tablet.png";
import imageCustomerGirlTabDesk2x from "../../img/HomePage/male-memojis-first-girl-desktop-tablet@2x.png";
import imageCustomerBoyMob1x from "../../img/HomePage/male-memojis-boy-mobile.png";
import imageCustomerBoyMob2x from "../../img/HomePage/male-memojis-boy-mobile@2x.png";
import imageCustomerBoyTabDesk1x from "../../img/HomePage/male-memojis-boy-desktop-tablet.png";
import imageCustomerBoyTabDesk2x from "../../img/HomePage/male-memojis-boy-desktop-tablet@2x.png";
import imageCustomerGirl2Mob1x from "../../img/HomePage/male-memojis-second-girl-mobile.png";
import imageCustomerGirl2Mob2x from "../../img/HomePage/male-memojis-second-girl-mobile@2x.png";
import imageCustomerGirl2TabDesk1x from "../../img/HomePage/male-memojis-second-girl-desktop-tablet.png";
import imageCustomerGirl2TabDesk2x from "../../img/HomePage/male-memojis-second-girl-desktop-tablet@2x.png";
import css from "./AdvantagesSection.module.css";
import clsx from "clsx";

export default function AdvantagesSection() {
  const userQuantity = useSelector(selectUsersQuantity);
  const isLoading = useSelector(selectUsersIsLoading);
  const isError = useSelector(selectUsersIsError);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const totalUsers = userQuantity?.data?.totalUsers || "";

  if (isLoading) {
    return <div>{t("AdvantagesSection.loading")}</div>;
  }

  if (isError) {
    return <div>{t("AdvantagesSection.error")}</div>;
  }

  return (
    <div className={css.advantagesContainer}>
      <div className={css.customersBox}>
        <ul className={css.customersList}>
          <li className={css.customerItem}>
            <picture className={css.customerPhoto}>
              <source
                media="(min-width: 768px)"
                srcSet={`
                  ${imageCustomerGirlTabDesk1x} 1x,
                  ${imageCustomerGirlTabDesk2x} 2x,
                `}
              />
              <img
                className={css.customerPhoto}
                srcSet={`
                  ${imageCustomerGirlMob1x} 1x,
                  ${imageCustomerGirlMob2x} 2x,
                `}
                src={imageCustomerGirlMob1x}
                alt={t("AdvantagesSection.customer")}
              />
            </picture>
          </li>

          <li className={css.customerItem}>
            <picture className={css.customerPhoto}>
              <source
                media="(min-width: 768px)"
                srcSet={`
                  ${imageCustomerBoyTabDesk1x} 1x,
                  ${imageCustomerBoyTabDesk2x} 2x, 
                `}
              />
              <img
                className={css.customerPhoto}
                srcSet={`
                  ${imageCustomerBoyMob1x} 1x,
                  ${imageCustomerBoyMob2x} 2x,
                `}
                src={imageCustomerBoyMob1x}
                alt={t("AdvantagesSection.customer")}
              />
            </picture>
          </li>

          <li className={css.customerItem}>
            <picture className={css.customerPhoto}>
              <source
                media="(min-width: 768px)"
                srcSet={`
                  ${imageCustomerGirl2TabDesk1x} 1x,
                  ${imageCustomerGirl2TabDesk2x} 2x, 
                `}
              />
              <img
                className={css.customerPhoto}
                srcSet={`
                  ${imageCustomerGirl2Mob1x} 1x,
                  ${imageCustomerGirl2Mob2x} 2x,
                `}
                src={imageCustomerGirl2Mob1x}
                alt={t("AdvantagesSection.customer")}
              />
            </picture>
          </li>
        </ul>
        <p className={css.customerText}>
          {t("AdvantagesSection.totalUsers", { count: totalUsers })}{" "}
          <span className={css.happy}>{t("AdvantagesSection.happy")}</span>{" "}
          {t("AdvantagesSection.customers")}
        </p>
      </div>

      <div className={css.advantagesBox}>
        <ul className={css.advantagesBoxList}>
          <li className={css.advantagesList}>
            <p
              className={clsx(
                css.advantagesListText,
                css.advantagesListTextFirst
              )}
            >
              {t("AdvantagesSection.habit")}
            </p>
          </li>
          <li className={clsx(css.advantagesList, css.advantagesListGreen)}>
            <p className={css.advantagesListText}>
              {t("AdvantagesSection.view")}
            </p>
          </li>
          <li className={clsx(css.advantagesList, css.advantagesListWhite)}>
            <p className={css.advantagesListText}>
              {t("AdvantagesSection.rate")}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
