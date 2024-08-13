import Logo from "../../components/Logo/Logo.jsx";
import css from "./ResetPassword.module.css";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { requestResetEmail } from "../../redux/auth/operations.js";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleResetPassword = async (values, actions) => {
    dispatch(requestResetEmail(values));
    actions.resetForm();
  };

  let resetPasswordEmailSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("ResetPassword.emailInvalid"))
      .matches(/\S+@\S+\.\S+/, t("ResetPassword.emailInvalid"))
      .required(t("ResetPassword.emailRequired")),
  });

  return (
    <div className={css.resetPasswordContainer}>
      <div className={css.resetPassword}>
        <Logo />
        <div className={css.formContent}>
          <h3 className={css.resetTitle}>{t("ResetPassword.title")}</h3>
          <p className={css.resetTextContent}>{t("ResetPassword.text")}</p>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={resetPasswordEmailSchema}
            onSubmit={handleResetPassword}
          >
            <Form className={css.resetPasswordForm}>
              <label htmlFor="email" className={css.resetLabel}>
                {t("ResetPassword.email")}
                <Field
                  type="email"
                  name="email"
                  placeholder={t("ResetPassword.emailPlaceholder")}
                  className={css.resetInput}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.errorMessage}
                />
              </label>
              <button type="submit" className={css.resetPasswordButton}>
                {t("ResetPassword.link")}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
