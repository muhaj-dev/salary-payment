import React from "react";
import { useAuth } from "../components/API/AuthContext";
import LoginHoc from "../components/LoginHoc";
import { Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { login, Loading, setLoading } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setLoading(true)
      login(values.email, values.password);
      
    },
  });

  return (
    <div className=" px-3 m-auto w-full">
      <div className="w-full ">
        <form onSubmit={formik.handleSubmit}>
          <div className="my-3">
            <label htmlFor="email" className="block font-semibold text-[16px]">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-[1.5px] rounded-md w-full text-[16px] border-[black] outline-[1.5px] outline-primary px-3 py-2 mt-1"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className=" text-[red] text-[14px] italic">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="my-3">
            <label
              htmlFor="password"
              className="block font-semibold text-[16px]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-[1.5px] w-full text-[16px] border-[black] outline-[1.5px] outline-primary px-3 py-2 mt-1 rounded-md"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className=" text-[red] text-[14px] italic">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="w-full">
            {!Loading ? (
              <button className="text-[16px] my-3 rounded-md py-3 text-white w-full bg-primary">
                Login
              </button>
            ) : (
              <Button
                isLoading
                // loadingText="Please wait"
                colorScheme="primary"
                variant="outline"
                spinnerPlacement="end"
                width={"full"}
                mt={4}
                py={4}
              >
                Continue
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginHoc(Login);
