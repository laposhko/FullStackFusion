import WelcomeSection from "../../components/WelcomeSection/WelcomeSection.jsx";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={css.homePage}>
      <WelcomeSection />
      <AdvantagesSection />
    </section>
  );
}
