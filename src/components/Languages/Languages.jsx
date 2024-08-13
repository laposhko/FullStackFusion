import SvgIcon from "../../img/icons/sprite";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

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
      <button onClick={() => changeLanguageHandler("en")} type="button">
        <SvgIcon
          className={style.flag}
          iconName="icon-en-flag"
          width={32}
          height={32}
        />
      </button>
      <button onClick={() => changeLanguageHandler("uk")} type="button">
        <SvgIcon
          className={style.flag}
          iconName="icon-uk-flag"
          width={32}
          height={32}
        />
      </button>
    </div>
  );
};

export default Languages;
