import React, { useState, useEffect } from "react";
import SignInForm from "src/components/SignInForm/SignInForm.jsx";
import AdvantagesSection from "src/components/AdvantagesSection/AdvantagesSection";
import css from "./SignInPage.module.css";
import Container from "src/components/Container/Container"; //нету такого файла, но по логике должен быть

const SignInPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container>
      <div className={css.signInContainer}>
        <SignInForm />
        {!isMobile && <AdvantagesSection />}
      </div>
    </Container>
  );
};

export default SignInPage;
