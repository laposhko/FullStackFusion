import { useTranslation } from "react-i18next";
import clsx from "clsx";
import css from "./Languages.module.css";
import style from "./Languages.module.css";

const Languages = ({ tracker }) => {
  const { i18n } = useTranslation();

  const changeClasses = () => {
    return clsx({
      [style.langBtnContainer]: tracker,
      [style.trackerLangContainer]: !tracker,
    });
  };

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={changeClasses()}>
      <button
        className={css.langBtn}
        onClick={() => changeLanguageHandler("en")}
        type="button"
      >
        eng
        {/* <SvgIcon
          className={style.flag}
          iconName="icon-en-flag"
          width={32}
          height={32}
        /> */}
      </button>
      <button
        className={css.langBtn}
        onClick={() => changeLanguageHandler("uk")}
        type="button"
      >
        ukr
        {/* <SvgIcon
          className={style.flag}
          iconName="icon-uk-flag"
          width={32}
          height={32}
        /> */}
      </button>
    </div>
  );
};

export default Languages;
