import Logo from "../../components/Logo/Logo.jsx";
import css from "./ResetPassword.module.css";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { requestResetEmail } from "../../redux/auth/operations.js";
import { useDispatch } from "react-redux";

let resetPasswordEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .matches(/\S+@\S+\.\S+/, "Invalid email")
    .required("Email is required!"),
});

export default function ResetPassword() {
  const dispatch = useDispatch();

  const handleResetPassword = async (values, actions) => {
    dispatch(requestResetEmail(values));
    actions.resetForm();
  };

  return (
    <div className={css.resetPasswordContainer}>
      <div className={css.resetPassword}>
        <Logo />
        <div className={css.formContent}>
          <h3 className={css.resetTitle}>Don&apos;t remember your password?</h3>
          <p className={css.resetTextContent}>
            Specify the e-mail that was used during registration - we will send
            you a link.
          </p>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={resetPasswordEmailSchema}
            onSubmit={handleResetPassword}>
            <Form className={css.resetPasswordForm}>
              <label htmlFor="email" className={css.resetLabel}>
                Email
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={css.resetInput}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.errorMessage}
                />
              </label>
              <button type="submit" className={css.resetPasswordButton}>
                Send a link
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
