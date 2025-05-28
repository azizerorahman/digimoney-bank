import Header from "./Header";
import Features from "./Features";
import TestimonialsAndTrust from "./TestimonialsAndTrust";
import HowItWorks from "./HowItWorks";
import CurrencyConverter from "./CurrencyConverter";
import Contact from "./Contact";

const Home = () => {
  return (
    <div>
      <Header />
      <Features />
      <TestimonialsAndTrust />
      <HowItWorks />
      <CurrencyConverter />
      <Contact />

      {/* <MobileApp />
      <Security /> */}
    </div>
  );
};

export default Home;
