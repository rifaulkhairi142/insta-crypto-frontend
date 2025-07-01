import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { getMe } from "../features/authSlice";
import Loading from "./Loading";

const AppWrapper = () => {
  const dispatch   = useDispatch();
  const location   = useLocation();          // detect page change
  const { isLoading, user } = useSelector((s) => s.auth);

  // panggil getMe setiap mount & setiap ganti route
  useEffect(() => {
    dispatch(getMe());
  }, [location.pathname, dispatch]);         // ⚠️ hanya path & dispatch

  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return <Outlet context={{ user }} />;
};

export default AppWrapper;
