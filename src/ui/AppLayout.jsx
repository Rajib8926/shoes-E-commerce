import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div>
      <Navbar />
     
        <Outlet />
     
      <footer>footer</footer>
    </div>
  );
}

export default AppLayout;
