import React from "react";
import { useNavigate } from "react-router-dom";
import LoginHoc from "../components/LoginHoc";
import Input from "../common/Input";
import PasswordInput from "../common/PasswordInput";


const Login = () => {
  const navigate = useNavigate()
  return (
    <div className=" px-3 m-auto w-full">
      <div className="w-full ">
        <form>
          <Input
            label="Email address"
            type="email"
            // value={regFormData.email}
            // onChange={(e) => setRegFormData({...regFormData, email: e.target.value})}
            placeholder="name@example.com"
          />
          <PasswordInput
            label="Password"
            placeholder="*******"
            // value={regFormData.password}
            // onChange={(e) => setRegFormData({...regFormData, password: e.target.value})}
          />
          {/* <LightBtn text="Sign in"/> */}
          <div className="w-full">
            <button 
            onClick={() => {
              navigate("/admin/dashboard")
            }}
            className="text-[16px] my-3 rounded-md py-3 text-white w-full bg-primary">
              Login
            </button>
          </div>
         
        </form>
      </div>
    </div>
  );
};

export default LoginHoc(Login);
