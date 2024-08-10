// import Logo from "../../components/Logo/Logo";
// import SignInForm from "../../components/SignInForm/SignInForm";
// import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
// import css from "./SignInPage.module.css";

// const SignInPage = () => {
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1440);

//   const handleResize = () => {
//     setIsDesktop(window.innerWidth >= 1440);
//   };

//   useEffect(() => {
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className={css.container}>
//       <div className={css.mainForm}>
//         <Logo />
//         <SignInForm />
//       </div>
//       {isDesktop && <div className={css.desktopForm}><AdvantagesSection /></div>}
//     </div>
//   );
// };

// export default SignInPage;

import Logo from "../../components/Logo/Logo";
import SignInForm from "../../components/SignInForm/SignInForm";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";

import css from "./SignInPage.module.css";

const SignInPage = () => {
  return (
    <div className={css.container}>
      <div className={css.mainForm}>
        <Logo />
        <SignInForm />
      </div>
      <div className={css.desktopForm}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default SignInPage;
