import React, { useState } from "react";
import { useAuth } from "../components/API/AuthContext";
import LoginHoc from "../components/LoginHoc";
import { Button } from "@chakra-ui/react";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
});

const ResetPassword = () => {
  const { resetpassword, Loading, setLoading } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setLoading(true);
      resetpassword(values.email);
      // setShow(true);

    
    },
  });

  return (
    <div className=" px-3 m-auto w-full">
      <div className="w-full ">
        <Link to='/' className="underline text-primary  " >Back to login page</Link>
          <p className="mt-4 text-[20px] font-semibold italic">
            Enter your correct email address
          </p>
       
        <form onSubmit={formik.handleSubmit}>
          <div className="my-3">
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

          <div className="w-full">
            {!Loading ? (
              <button className="text-[16px] my-3 rounded-md py-3 text-white w-full bg-primary">
                Reset
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

export default LoginHoc(ResetPassword);
