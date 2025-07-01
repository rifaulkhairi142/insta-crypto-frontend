import { Link, useNavigate } from "react-router-dom";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { LoutOut, reset } from "../features/authSlice";
import { useEffect } from "react";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  let navigate = useNavigate();
  let navigateToLogin = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LoutOut());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-[100] h-24 pt-3 gap-y-4 flex flex-col font-binance-plex font-bold px-3  w-full opacity-95 backdrop-blur-lg bg-black text-lightning-yellow-400">
      {/* {!sidebarOpen && <span>INSTA CRYPTO</span>} */}
      <div className="flex w-full items-center justify-between">
        <Link to="/" className="flex flex-row gap-x-2 items-center cursor-pointer"> 
          <img className="w-12" src="/insta-crypto.png"/>
          <span>INSTA CRYPTO</span>
        </Link>
        <div className="flex flex-row gap-x-2">
          {user && <SecondaryButton label="Logout" onClick={() => logout()} />}
          {!user && (
            <SecondaryButton
              label="Login"
              onClick={() => navigateToLogin("/login")}
            />
          )}
          {!user && (
            <PrimaryButton
              label="Register"
              // onClick={() => navigateToLogin("/login")}
            />
          )}
        </div>
      </div>
      <hr className="border-InputLine" />
    </header>
  );
};

export default Header;
