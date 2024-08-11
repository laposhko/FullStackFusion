import { useTranslation } from "react-i18next";

const Languages = () => {
  const { t, i18n } = useTranslation();

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="langBtnContainer">
      <button
        onClick={() => changeLanguageHandler("en")}
        type="button"
      ></button>
      <button
        onClick={() => changeLanguageHandler("uk")}
        type="button"
      ></button>
    </div>
  );
};

export default Languages;
