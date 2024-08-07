import { useState, useEffect } from "react";
import SignInForm from "../../components/SignInForm/SignInForm";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import css from "./SignInPage.module.css";

const SignInPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth > 1440);

  const handleResize = () => {
    setIsMobile(window.innerWidth > 1440);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className={css.signInContainer}>
        <SignInForm />
        {isMobile && <AdvantagesSection />}
      </div>
    </div>
  );
};

export default SignInPage;