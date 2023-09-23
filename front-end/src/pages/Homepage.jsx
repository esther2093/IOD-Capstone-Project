import Banner from "../components/Banner";
import About from "../components/About";
import Services from "../components/Services";
import Footer from "../components/Footer";


export default function Homepage() {
  return (
    <div className="homepage">
      <Banner />
      <About />
      <Services />
      <Footer />
      </div>
  );
}
