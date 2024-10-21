import { Outlet } from "react-router-dom";
import Navigation from "../../components/Shared/NavBar/Navigation/Navigation";
import Footer from "../../components/Shared/Footer/Footer";

export default function Main() {
  return (
    <div>
      <Navigation />

      <Outlet />

      <Footer />
    </div>
  );
}
