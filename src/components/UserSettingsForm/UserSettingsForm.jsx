// import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./UserSettingsForm.module.css";
import { useState, useRef } from "react";
import { selectAuthUser } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { BsExclamationLg } from "react-icons/bs";
import { updateCurrentUser } from "../../redux/users/operations";
export default function UserSettingsForm() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const [activityTime, setActivityTime] = useState(0);
  const [userWeight, setUserWeight] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const defaultImg =
    "https://res.cloudinary.com/dntbkzhtq/image/upload/v1719141998/AquaTrack/defaultAvatar.webp";
  const validationSchema = Yup.object().shape({
    gender: Yup.string().oneOf(["woman", "man"]),
    name: Yup.string().max(100),
    email: Yup.string().email(),
    weight: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? null : value
      )
      .min(10)
      .max(250),
    activityTime: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? null : value
      )
      .min(0)
      .max(12),
    dailyWaterNorm: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? null : value
      )
      .min(0)
      .max(10),
    avatar: Yup.string(),
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
  const convertToBinaryString = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    console.log(file);
    if (file) {
      setValue("avatar", file);

      const reader = new FileReader();

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

      reader.onloadend = () => {
        setSelectedImage(reader.result);
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const avatar = selectedImage
    ? selectedImage
    : user.avatar
    ? user.avatar
    : defaultImg;
  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    if (data.name) {
      formData.append("name", data.name);
    }
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }
    if (data.gender) {
      formData.append("gender", data.gender);
    }
    if (data.email) {
      formData.append("email", data.email);
    }
    if (data.dailyActivity) {
      formData.append("dailyActivity", data.dailyActivity);
    }
    if (data.dailyWaterNorm) {
      formData.append("dailyWaterNorm", data.dailyWaterNorm);
    }
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    dispatch(updateCurrentUser(formData));
    // formData.append("name", data.name);
    // formData.append("avatar", data.image[0]); // Access the first file (in case of multiple files)

    // Dispatch to Redux or handle the form data as needed
    // dispatch(updateForm(formData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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
          <div className={css.inputContainer}>
            <label htmlFor="name" className={css.inputName}>
              Your name
            </label>
            <input
              className={css.inputField}
              id="name"
              type="text"
              placeholder={user.name}
              {...register("name", {})}
            />
          </div>
          <div className={css.inputContainer}>
            <label htmlFor="email" className={css.inputName}>
              Email
            </label>
            <input
              className={css.inputField}
              id="email"
              type="email"
              placeholder={user.email}
              {...register("email", {})}
            />
          </div>
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
              of active sports, or another type of activity commensurate in
              terms of loads (in the absence of these, you must set 0)
            </p>
            <span className={css.note}>
              <span className={css.accentColor}>
                <BsExclamationLg style={{ fontSize: "18px" }} />
              </span>
              Active time in hours
            </span>
          </div>
          {/* <div className={css.waterCalculatorContainer}> */}
          <div className={css.inputContainer}>
            <label htmlFor="weight">Your weight in kilograms:</label>
            <input
              className={css.inputField}
              id="weight"
              type="text"
              defaultValue={user.weight ? user.weight : 60}
              onChange={(e) => {
                setUserWeight(e.target.value);
              }}
              {...register("weight", {})}
            />
          </div>
          <div className={css.inputContainer}>
            <label htmlFor="activity">
              The time of active participation in sports:
            </label>
            <input
              className={css.inputField}
              id="activity"
              type="text"
              placeholder={user.dailyActivity}
              onChange={(e) => {
                setActivityTime(e.target.value);
              }}
              {...register("dailyActivity", {})}
            />
          </div>
          {/* </div> */}
          <div className={css.inputContainer}>
            <p>The required amount of water in liters per day:</p>
            <span className={css.waterAmount}>
              {userWeight + activityTime}
              {/* {Number(userWeight) * 0.03 + Number(activityTime) * 0.6} L */}
            </span>
          </div>

          <div className={css.inputContainer}>
            <label htmlFor="water" className={css.inputName}>
              Write down how much water you will drink:
            </label>
            <input
              className={css.inputField}
              id="water"
              type="text"
              {...register("dailyWaterNorm", {})}
            />
          </div>
          <button className={css.saveBtn} type="submit" onSubmit={onSubmit}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
