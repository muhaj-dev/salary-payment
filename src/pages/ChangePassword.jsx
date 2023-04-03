import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import {IoMdArrowBack} from 'react-icons/io'
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import LoginHoc from "../components/LoginHoc";
import { successToastMessage, errorToastMessage } from "../helpers/toast";
import { Link } from "react-router-dom";

function ChangePassword() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "New password must be at least 6 characters long")
        .required("New password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      console.log(values);
      let token = localStorage.getItem("lorchaintoken");

      try {
        const response = await fetch(
          `${process.env.REACT_APP_LORCHAIN_API}/users/change-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
          }
        );
        let data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        successToastMessage(toast, "Password successfully updated!");
      } catch (error) {
        console.error(error);
        errorToastMessage(toast, error.message);
        setFieldError("oldPassword", error.message);
      }
      setSubmitting(false);
    },
  });

  return (
    <div className=" px-3 m-auto w-full">
      <div className="w-full ">
        {/* <Link className="text-primary flex gap-2 items-center" to='/'>
          <IoMdArrowBack />
        <span className="underline font-semibold">Back to dashboard</span>
        </Link> */}
        <form onSubmit={formik.handleSubmit}>
          {formik.touched.oldPassword && formik.errors.oldPassword ? (
            <div className="text-red-600 italic font-semibold">
              {formik.errors.oldPassword}
            </div>
          ) : null}
          <div className="my-3 relative">
            <label
              htmlFor="password"
              className="block font-semibold text-[16px]"
            >
              Current Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="oldPassword"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-[1.5px] w-full text-[16px] border-[black] outline-[1.5px] outline-primary px-3 py-2 mt-1 rounded-md"
            />
            <div className="absolute top-10 right-4" onClick={handleClick}>
              {show ? <BsEyeFill /> : <BsEyeSlashFill />}
            </div>
          </div>

          <div className="my-3 relative">
            <label
              htmlFor="password"
              className="block font-semibold text-[16px]"
            >
              New Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-[1.5px] w-full text-[16px] border-[black] outline-[1.5px] outline-primary px-3 py-2 mt-1 rounded-md"
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-red-600 text-[12px] italic">
                {formik.errors.newPassword}
              </div>
            ) : null}
            <div className="absolute top-10 right-4" onClick={handleClick}>
              {show ? <BsEyeFill /> : <BsEyeSlashFill />}
            </div>
          </div>

          <button
            type="submit"
            className="text-[16px] my-3 rounded-md py-3 text-white w-full bg-primary"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Submitting..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginHoc(ChangePassword);
