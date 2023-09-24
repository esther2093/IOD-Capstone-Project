import HomeBanner from "../components/HomeBanner";
import About from "../components/About";
import Services from "../components/Services";
import Footer from "../components/Footer";

export default function Homepage() {
  return (
    <div className="homepage">
      <HomeBanner />
      <About />
      <Services />
      <Footer />
      </div>
  );
}
