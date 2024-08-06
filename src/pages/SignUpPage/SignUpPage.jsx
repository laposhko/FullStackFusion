import Logo from "../../components/Logo/Logo";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

import style from "./SignUpPage.module.css";

const SignUpPage = () => {
  return (
    <div className={style.container}>
      <div className={style.mainForm}>
        <Logo />
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
