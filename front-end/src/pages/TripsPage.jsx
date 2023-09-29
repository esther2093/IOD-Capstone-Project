import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

export default function TripsPage () {

  return (
    <div className="TripsPage">
      <Outlet />
      <Footer />
    </div>
  );
}
 