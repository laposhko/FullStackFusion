import i18n from "../utils/i18n";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return i18n.t("ChooseDate.today");
  }
  const day = date.getDate();
  const month = date.toLocaleString("eng", { month: "long" });

  return `${day}, ${month}`;
};

export default formatDate;
