import Logo from "../../components/Logo/Logo";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";

import style from "./SignUpPage.module.css";

const SignUpPage = () => {
  return (
    <div className={style.container}>
      <div className={style.mainForm}>
        <Logo />
        <SignUpForm />
      </div>
      <div className={style.desktopForm}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default SignUpPage;
