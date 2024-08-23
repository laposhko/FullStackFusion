// import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./UserSettingsForm.module.css";
import { useState, useRef, useEffect } from "react";
import { selectAuthUser } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { BsExclamationLg } from "react-icons/bs";
import { updateCurrentUser } from "../../redux/auth/operations";
import { useModalContext } from "../../context/useModalContext";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function UserSettingsForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector(selectAuthUser);
  const [activityTime, setActivityTime] = useState(user.dailyActivityTime);
  const [userWeight, setUserWeight] = useState(user.weight);
  const [gender, setGender] = useState(user.gender);
  const [recommendedWaterNorm, setRecommendedWaterNorm] = useState();
  useEffect(() => {
    setRecommendedWaterNorm(
      (gender === "woman"
        ? userWeight * 0.03 + activityTime * 0.4
        : userWeight * 0.04 + activityTime * 0.6
      ).toFixed(1)
    );
  }, [activityTime, userWeight, gender]);
  const { closeModal } = useModalContext();

  const [selectedImage, setSelectedImage] = useState(null);
  const defaultImg =
    "https://res.cloudinary.com/dntbkzhtq/image/upload/v1719141998/AquaTrack/defaultAvatar.webp";
  const validationSchema = Yup.object().shape({
    gender: Yup.string().oneOf(
      ["woman", "man"],
      t("UserSettingsForm.genderOneOf")
    ),
    name: Yup.string().max(70, t("UserSettingsForm.nameMax")),
    email: Yup.string()
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        t("UserSettingsForm.emailMatch")
      )
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? null : value
      ),
    weight: Yup.number()
      .typeError(t("UserSettingsForm.weightTypeError"))
      .nullable(t("UserSettingsForm.weightNullable"))
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? null : value
      )
      .min(10, t("UserSettingsForm.weightMin"))
      .max(250, t("UserSettingsForm.weightMax")),
    dailyActivityTime: Yup.number()
      .typeError(t("UserSettingsForm.timeTypeError"))
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? null : value
      )
      .min(0, t("UserSettingsForm.timeMin"))
      .max(12, t("UserSettingsForm.timeMax")),
    dailyWaterNorm: Yup.number()
      .typeError(t("UserSettingsForm.normTypeError"))
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? null : value
      )
      .min(0, t("UserSettingsForm.normMin"))
      .max(10, t("UserSettingsForm.normMax")),
    avatar: Yup.mixed(),
  });
  const {
    register,
    handleSubmit,
    // formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setValue("avatar", file);
    }
  };

  const avatar = selectedImage
    ? selectedImage
    : user.avatar
    ? user.avatar
    : defaultImg;
  const onSubmit = (data) => {
    const formData = new FormData();
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }
    if (data.gender != user.gender) {
      formData.append("gender", data.gender);
    }
    if (data.name) {
      formData.append("name", data.name);
    }
    if (data.email) {
      formData.append("email", data.email);
    }
    if (data.weight) {
      formData.append("weight", data.weight);
    }
    if (data.dailyActivityTime) {
      formData.append("dailyActivityTime", data.dailyActivityTime);
    }
    // formData.append("dailyWaterNorm", recommendedWaterNorm);

    if (data.dailyWaterNorm) {
      formData.append("dailyWaterNorm", data.dailyWaterNorm);
    }

    const isEmpty = Array.from(formData.entries()).length === 0;
    if (isEmpty) {
      closeModal();
      return;
    }
    // formData.forEach((key, value) => {
    //   console.log(value, key);
    // });
    dispatch(updateCurrentUser(formData))
      .unwrap()
      .then(() => {
        toast.success(t("UserSettingsForm.success"));
        closeModal();
      })
      .catch(() => {
        toast.error(t("UserSettingsForm.error"));
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      {/* IMG UPLOAD CONTAINER */}
      <div className={css.uploadImgContainer} onClick={handleClick}>
        <img
          className={css.avatar}
          src={avatar}
          alt={t("UserSettingsForm.alt")}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
          // {...register("avatar")}
        />
        <p className={css.uploadBtn}>
          <FiUpload />
          <span>{t("UserSettingsForm.uploadPhoto")}</span>
        </p>
      </div>

      <div className={css.inputsContainer}>
        {/* GENDER */}
        <div className={css.inputContainer}>
          <label htmlFor="gender" className={css.inputName}>
            {t("UserSettingsForm.genderIdentity")}
          </label>
          <div className={css.radiobuttons}>
            <label className={css.radiobuttonsLabel}>
              <input
                id="gender"
                {...register("gender")}
                type="radio"
                value="woman"
                className={css.radioInput}
                defaultChecked={user.gender === "woman"}
                onChange={() => setGender("woman")}
              />
              <span className={css.customRadio}></span>
              <span className={css.radiobuttonText}>
                {t("UserSettingsForm.woman")}
              </span>
            </label>
            <label className={css.radiobuttonsLabel}>
              <input
                id="gender"
                {...register("gender")}
                type="radio"
                value="man"
                className={css.radioInput}
                defaultChecked={user.gender === "man"}
                onChange={() => setGender("man")}
              />
              <span className={css.customRadio}></span>
              <span className={css.radiobuttonText}>
                {t("UserSettingsForm.man")}
              </span>
            </label>
          </div>
        </div>
        {/* USER INFO */}
        <div className={css.userInfoAllContainer}>
          <div className={css.userInfoPart1}>
            <div className={css.inputContainer}>
              <label htmlFor="name" className={css.inputName}>
                {t("UserSettingsForm.name")}
                <input
                  className={css.inputField}
                  id="name"
                  type="text"
                  placeholder={user.name}
                  {...register("name", {})}
                />
              </label>
              <label htmlFor="email" className={css.inputName}>
                {t("UserSettingsForm.email")}
                <input
                  className={css.inputField}
                  id="email"
                  type="email"
                  placeholder={user.email}
                  {...register("email", {})}
                />
              </label>
            </div>
            {/* FORMULAS */}
            <div className={css.inputContainer}>
              <h5 className={css.inputName}>{t("UserSettingsForm.norma")}</h5>
              <div className={css.formulas}>
                <div className={css.formulaBlock}>
                  <h6 className={css.formulaLabel}>
                    {t("UserSettingsForm.normaWoman")}
                  </h6>
                  <p className={css.formula}>V=(M*0,03) + (T*0,4)</p>
                </div>
                <div className={css.formulaBlock}>
                  <h6 className={css.formulaLabel}>
                    {t("UserSettingsForm.normaMan")}
                  </h6>
                  <p className={css.formula}>V=(M*0,04) + (T*0,6)</p>
                </div>
              </div>

              <p className={css.formulasDescription}>
                <span className={css.accentColor}>*</span>{" "}
                {t("UserSettingsForm.description")}
              </p>
              <span className={css.note}>
                <span className={css.accentColor}>
                  <BsExclamationLg style={{ fontSize: "18px" }} />
                </span>
                {t("UserSettingsForm.activeTime")}
              </span>
            </div>
          </div>
          {/* CALCULATOR */}
          <div className={css.userInfoPart2}>
            <div className={css.inputContainer}>
              <label htmlFor="weight" className={css.calculatorField}>
                {t("UserSettingsForm.weight")}
                <input
                  className={css.inputField}
                  id="weight"
                  type="text"
                  defaultValue={user.weight ? user.weight : 60}
                  onChange={(e) => {
                    setValue("weight", e.target.value);

                    setUserWeight(e.target.value);
                  }}
                  // {...register("weight", {})}
                />
              </label>

              <label htmlFor="activity" className={css.calculatorField}>
                {t("UserSettingsForm.activity")}
                <input
                  className={css.inputField}
                  id="activity"
                  type="text"
                  defaultValue={
                    user.dailyActivityTime ? user.dailyActivityTime : 0
                  }
                  onChange={(e) => {
                    setValue("dailyActivityTime", e.target.value);
                    setActivityTime(e.target.value);
                  }}
                  // {...register("dailyActivity", {})}
                />
              </label>
            </div>

            {/* WATER AMOUNT */}
            <div className={css.inputContainer}>
              <div className={css.calculatorField}>
                <p>{t("UserSettingsForm.amount")}</p>
                <span className={css.waterAmount}>
                  {t("UserSettingsForm.l", { count: recommendedWaterNorm })}
                </span>
              </div>

              <label htmlFor="water" className={css.inputName}>
                {t("UserSettingsForm.drink")}
                <input
                  className={css.inputField}
                  id="water"
                  type="text"
                  placeholder={user.dailyWaterNorm}
                  onChange={(e) => setValue("dailyWaterNorm", e.target.value)}
                  {...register("dailyWaterNorm", {})}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <button className={css.saveBtn} type="submit" onSubmit={onSubmit}>
        {t("UserSettingsForm.save")}
      </button>
    </form>
  );
}
