// import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./UserSettingsForm.module.css";

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
        <div className={css.inputContainer}>
          <label htmlFor="gender">Your gender identity</label>
          <div className={css.radiobuttons}>
            <label>
              <input
                id="gender"
                {...register("Gender")}
                type="radio"
                value="Woman"
              />
              Woman
            </label>
            <label>
              <input
                id="gender"
                {...register("Gender")}
                type="radio"
                value="Man"
              />
              Man
            </label>
          </div>
        </div>
        <div className={css.inputContainer}>
          <label htmlFor="name"> Your name</label>
          <input id="name" type="text" {...register("Name", {})} />
        </div>
        <div className={css.inputContainer}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("Email", {})} />
        </div>
        <div>
          <h5>My daily norma</h5>
          <p>For woman</p>
          <span>V=(M*0,03) + (T*0,4)</span>
          <p>For man</p>
          <span>V=(M*0,04) + (T*0,6)</span>
          <p>
            * V is the volume of the water norm in liters per day, M is your
            body weight, T is the time of active sports, or another type of
            activity commensurate in terms of loads (in the absence of these,
            you must set 0)
          </p>
          <span>Active time in hours</span>
        </div>
        <div className={css.inputContainer}>
          <label htmlFor="weight">Your weight in kilograms:</label>
          <input id="weight" type="text" {...register("Weight", {})} />
        </div>
        <div className={css.inputContainer}>
          <label htmlFor="activity">
            The time of active participation in sports:
          </label>
          <input id="activity" type="text" {...register("Activity time", {})} />
        </div>
        <div className={css.inputContainer}>
          <label htmlFor="water">
            Write down how much water you will drink:
          </label>
          <input
            id="water"
            type="text"
            {...register("Quantity of water", {})}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
