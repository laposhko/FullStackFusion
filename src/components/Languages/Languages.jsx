import SvgIcon from "../../img/icons/sprite";
import { useTranslation } from "react-i18next";

import style from "./Languages.module.css";

const Languages = () => {
  const { i18n } = useTranslation();

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={style.langBtnContainer}>
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
