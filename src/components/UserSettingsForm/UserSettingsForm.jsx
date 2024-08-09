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
  const [activityTime, setActivityTime] = useState(0);
  const [userWeight, setUserWeight] = useState(0);
  const user = useSelector(selectAuthUser);
  const defaultImg =
    "data:image/jpeg;base64,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";
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
  const [selectedImage, setSelectedImage] = useState(null);

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
        setValue("avatar", reader.result);
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

  // dispatch(
  //   signUp({
  //     email: data.email,
  //     password: data.password,
  //   })
  // );
  // try {
  //   const response = await dispatch({ type: , payload: data });

  //   if (response.error) {
  //     throw new Error(response.error.message);
  //   }
  // } catch (error) {
  //   toast.error(error.message);
  // }
  // };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.uploadImgContainer} onClick={handleClick}>
          <img
            className={css.avatar}
            src={avatar}
            // src={user.avatar ? user.avatar : defaultImg}
            alt="avatar"
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
                  defaultChecked
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
