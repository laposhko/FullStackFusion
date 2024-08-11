// import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./UserSettingsForm.module.css";
import { useState, useRef, useMemo } from "react";
import { selectAuthUser } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { BsExclamationLg } from "react-icons/bs";
import { updateCurrentUser } from "../../redux/auth/operations";
import { useModalContext } from "../../context/useModalContext";
import toast from "react-hot-toast";
export default function UserSettingsForm() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const [activityTime, setActivityTime] = useState(0);
  const [userWeight, setUserWeight] = useState(0);
  const recommendedWaterNorm = useMemo(() => {
    return (
      Number(userWeight) * 0.03 + Number(activityTime) * 0.6
        ? Number(userWeight) * 0.03 + Number(activityTime) * 0.6
        : user.weight * 0.03 + user.dailyActivityTime * 0.6
    ).toFixed(1);
  }, [activityTime, userWeight, user.weight, user.dailyActivityTime]);

  const { closeModal } = useModalContext();

  const [selectedImage, setSelectedImage] = useState(null);
  const defaultImg =
    "https://res.cloudinary.com/dntbkzhtq/image/upload/v1719141998/AquaTrack/defaultAvatar.webp";
  const validationSchema = Yup.object().shape({
    gender: Yup.string().oneOf(
      ["woman", "man"],
      "Gender can be only woman or man"
    ),
    name: Yup.string().max(70, "Name should not be longer than 70 characters"),
    email: Yup.string()
      .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Invalid email")
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? null : value
      ),
    weight: Yup.number()
      .typeError("Weight must be a number")
      .nullable("Weight should be a number")
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? null : value
      )
      .min(10, "Weight should not be less than 10 kg")
      .max(250, "Weight should not be more than 250 kg"),
    dailyActivityTime: Yup.number()
      .typeError("Activity number must be a number")
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? null : value
      )
      .min(0, "Activity time cannot be negative number")
      .max(12, "Activity time cannot be more than 12 hours for day"),
    dailyWaterNorm: Yup.number()
      .typeError("Daily water norm must be a number")
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? null : value
      )
      .min(0, "Water norm should be more than 0 L")
      .max(10, "Water norm should not be more than 10 L for day"),
    avatar: Yup.mixed(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  // const convertToBinaryString = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsBinaryString(file);
  //   });
  // };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    console.log(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setValue("avatar", file);
    }
  };
  // const reader = new FileReader();

  // reader.onloadend = () => {
  //   const base64String = reader.result
  //     .replace("data:", "")
  //     .replace(/^.+,/, "");
  //   console.log(base64String);
  // };
  // const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

  // Assuming you're sending the image as part of a JSON payload
  // const payload = {
  //   image: base64String,
  // };
  // const binaryString = await convertToBinaryString(file);
  // console.log(binaryString);
  // console.log(URL.createObjectURL(file));
  // setValue("avatar", binaryString);

  //   reader.onloadend = () => {
  //     setSelectedImage(reader.result);
  //     console.log(reader.result);
  //   };
  //   reader.readAsDataURL(file);

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
      formData.append("dailyActivityTime", data.dailyActivity);
    }
    if (data.dailyWaterNorm) {
      formData.append("dailyWaterNorm", data.dailyWaterNorm);
    }

    const isEmpty = Array.from(formData.entries()).length === 0;
    if (isEmpty) {
      toast.error("You did not any changes");
      return;
    }
    dispatch(updateCurrentUser(formData))
      .unwrap()
      .then(() => {
        toast.success("Your info updated!");
        closeModal();
      })
      .catch(() => {
        toast.error("Something went wrong.Please try again!");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      {/* IMG UPLOAD CONTAINER */}
      <div className={css.uploadImgContainer} onClick={handleClick}>
        <img className={css.avatar} src={avatar} alt="avatar" />
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
          <span> Upload a photo</span>
        </p>
      </div>

      <div className={css.inputsContainer}>
        {/* GENDER */}
        <div className={css.inputContainer}>
          <label htmlFor="gender" className={css.inputName}>
            Your gender identity
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
              />
              <span className={css.customRadio}></span>
              <span className={css.radiobuttonText}>Woman</span>
            </label>
            <label className={css.radiobuttonsLabel}>
              <input
                id="gender"
                {...register("gender")}
                type="radio"
                value="man"
                className={css.radioInput}
                defaultChecked={user.gender === "man"}
              />
              <span className={css.customRadio}></span>
              <span className={css.radiobuttonText}>Man</span>
            </label>
          </div>
        </div>
        {/* USER INFO */}
        <div className={css.inputContainer}>
          <label htmlFor="name" className={css.inputName}>
            Your name
            <input
              className={css.inputField}
              id="name"
              type="text"
              placeholder={user.name}
              {...register("name", {})}
            />
            {errors.name && (
              <p className={css.errorMessage}>{errors.name?.message}</p>
            )}
          </label>
          <label htmlFor="email" className={css.inputName}>
            Email
            <input
              className={css.inputField}
              id="email"
              type="email"
              placeholder={user.email}
              {...register("email", {})}
            />
            {errors.email && (
              <p className={css.errorMessage}>{errors.email?.message}</p>
            )}
          </label>
        </div>

        {/* FORMULAS */}
        <div className={css.inputContainer}>
          <h5 className={css.inputName}>My daily norma</h5>
          <div className={css.formulas}>
            <div className={css.formulaBlock}>
              <h6 className={css.formulaLabel}>For woman</h6>
              <p className={css.formula}>V=(M*0,03) + (T*0,4)</p>
            </div>
            <div className={css.formulaBlock}>
              <h6 className={css.formulaLabel}>For man</h6>
              <p className={css.formula}>V=(M*0,04) + (T*0,6)</p>
            </div>
          </div>

          <p className={css.formulasDescription}>
            <span className={css.accentColor}>*</span> V is the volume of the
            water norm in liters per day, M is your body weight, T is the time
            of active sports, or another type of activity commensurate in terms
            of loads (in the absence of these, you must set 0)
          </p>
          <span className={css.note}>
            <span className={css.accentColor}>
              <BsExclamationLg style={{ fontSize: "18px" }} />
            </span>
            Active time in hours
          </span>
        </div>

        {/* CALCULATOR */}
        <div className={css.inputContainer}>
          <label htmlFor="weight" className={css.calculatorField}>
            Your weight in kilograms:
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
            {errors.weight && (
              <p className={css.errorMessage}>{errors.weight?.message}</p>
            )}
          </label>

          <label htmlFor="activity" className={css.calculatorField}>
            The time of active participation in sports:
            <input
              className={css.inputField}
              id="activity"
              type="text"
              defaultValue={user.dailyActivityTime ? user.dailyActivityTime : 0}
              onChange={(e) => {
                setValue("dailyActivityTime", e.target.value);
                setActivityTime(e.target.value);
              }}
              // {...register("dailyActivity", {})}
            />
            {errors.dailyActivityTime && (
              <p className={css.errorMessage}>
                {errors.dailyActivityTime?.message}
              </p>
            )}
          </label>
        </div>

        {/* WATER AMOUNT */}
        <div className={css.inputContainer}>
          <div className={css.calculatorField}>
            <p>The required amount of water in liters per day:</p>
            <span className={css.waterAmount}>{recommendedWaterNorm} L</span>
          </div>

          <label htmlFor="water" className={css.inputName}>
            Write down how much water you will drink:
            <input
              className={css.inputField}
              id="water"
              type="text"
              placeholder={recommendedWaterNorm}
              {...register("dailyWaterNorm", {})}
            />
            {errors.dailyWaterNorm && (
              <p className={css.errorMessage}>
                {errors.dailyWaterNorm?.message}
              </p>
            )}
          </label>
        </div>
      </div>
      <button className={css.saveBtn} type="submit" onSubmit={onSubmit}>
        Save
      </button>
    </form>
  );
}
