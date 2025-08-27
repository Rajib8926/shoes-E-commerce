import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";

function AppLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait until everything (including images) is loaded
    window.addEventListener("load", () => {
      setLoading(false);
    });
  }, []);
  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      )}
    </div>
  );
}

export default AppLayout;
