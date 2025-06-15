import PrimaryButton from "../component/PrimaryButton";
import NormalInput from "../component/NormalInput";
import PasswordInput from "../component/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import { useEffect, useState } from "react";
import Footer from "../component/Footer";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isError, isSuccess, isLoading, message} = useSelector((state)=>state.auth);
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(LoginUser({email, password}));

  };

  useEffect(()=> {
    console.log('user ', user);
    if(user || isSuccess){
      navigate("/")
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate])
  return (
    <div className="bg-BasicBg flex justify-center flex-col items-center">
      <div className="p-10 w-full flex rounded-4xl md:max-w-md flex-col gap-y-6 ring-0 md:ring-1 ring-InputLine mt-20">
        <div className="flex flex-row gap-x-2 cursor-pointer items-center">
          <img src="/insta-crypto.png" className="w-10 h-10" />
          <span className="font-bold text-lg text-textBrand">INSTA CRYPTO</span>
        </div>
        <h1 className="text-white font-bold text-4xl">Log in</h1>
        <div className="flex flex-col gap-y-4">
          <NormalInput
            label="Name"
            placeholder="Name"
            type="text"
            value={email}
            onChange={(e) => setName(e.target.value)}
          />
          <NormalInput
            label="Email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <PasswordInput
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PrimaryButton label="Login" onClick={(e) => handleLogin(e)} />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
