import React, { useState } from "react";
import { useAuth } from "../components/API/AuthContext";
import LoginHoc from "../components/LoginHoc";
import Input from "../common/Input";
import PasswordInput from "../common/PasswordInput";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("input corect email or password");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className=" px-3 m-auto w-full">
      <div className="w-full ">
        {/* {error && <div>{error}</div>} */}
        <form onSubmit={handleLogin}>
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
          <PasswordInput
            label="Password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <LightBtn text="Sign in"/> */}
          <div className="w-full">
            <button className="text-[16px] my-3 rounded-md py-3 text-white w-full bg-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginHoc(Login);
