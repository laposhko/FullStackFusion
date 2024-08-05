// import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./UserSettingsForm.module.css";
import SvgIcon from "../../img/icons/sprite";

export default function UserSettingsForm() {
  // const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({});
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    console.log(data);
    // try {
    //   const response = await dispatch({ type: , payload: data });

    //   if (response.error) {
    //     throw new Error(response.error.message);
    //   }
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.uploadImgContainer}>
          <img className={css.avatar} src="" alt="" />
          <button>
            <SvgIcon
              className={css.uploadIcon}
              iconName="icon-upload"
              width={18}
              height={18}
            ></SvgIcon>
            Upload a photo
          </button>
        </div>
        <div className={css.inputContainer}>
          <label htmlFor="gender" className={css.inputName}>
            Your gender identity
          </label>
          <div className={css.radiobuttons}>
            <label className={css.radiobuttonsLabel}>
              <input
                id="gender"
                {...register("Gender")}
                type="radio"
                value="Woman"
                className={css.radioInput}
                defaultChecked
              />
              <span className={css.customRadio}></span>
              <span className={css.radiobuttonText}>Woman</span>
            </label>
            <label className={css.radiobuttonsLabel}>
              <input
                id="gender"
                {...register("Gender")}
                type="radio"
                value="Man"
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
            {...register("Name", {})}
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
            {...register("Email", {})}
          />
        </div>
        <div className={css.inputContainer}>
          <h5 className={css.inputName}>My daily norma</h5>
          <h6 className={css.formulaLabel}>For woman</h6>
          <p className={css.formula}>V=(M*0,03) + (T*0,4)</p>
          <h6 className={css.formulaLabel}>For man</h6>
          <p className={css.formula}>V=(M*0,04) + (T*0,6)</p>
          <p className={css.formulasDescription}>
            <span className={css.accentColor}>*</span> V is the volume of the
            water norm in liters per day, M is your body weight, T is the time
            of active sports, or another type of activity commensurate in terms
            of loads (in the absence of these, you must set 0)
          </p>
          <span>
            <span className={css.accentColor}>!</span> Active time in hours
          </span>
        </div>
        {/* <div className={css.waterCalculatorContainer}> */}
        <div className={css.inputContainer}>
          <label htmlFor="weight">Your weight in kilograms:</label>
          <input
            className={css.inputField}
            id="weight"
            type="text"
            {...register("Weight", {})}
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
            {...register("Activity time", {})}
          />
        </div>
        {/* </div> */}
        <div className={css.inputContainer}>
          <p>The required amount of water in liters per day:</p>
          <span className={css.waterAmount}>1.8 L</span>
        </div>

        <div className={css.inputContainer}>
          <label htmlFor="water" className={css.inputName}>
            Write down how much water you will drink:
          </label>
          <input
            className={css.inputField}
            id="water"
            type="text"
            {...register("Quantity of water", {})}
          />
        </div>
        <button className={css.saveBtn} type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
