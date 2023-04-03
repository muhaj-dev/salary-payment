import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoginHoc from "../components/LoginHoc";

function ChangePassword() {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(8, "New password must be at least 8 characters long")
        .required("New password is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm new password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      console.log(values);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_LORCHAIN_API}/change-password`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update password.");
        }
        alert("Password successfully updated!");
      } catch (error) {
        console.error(error);
        setFieldError("currentPassword", "Failed to update password.");
      }
      setSubmitting(false);
    },
  });

  return (
    <div className=" px-3 m-auto w-full">
      <div className="w-full ">
        <form onSubmit={formik.handleSubmit}>
          <div className="my-3">
            <label
              htmlFor="password"
              className="block font-semibold text-[16px]"
            >
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-[1.5px] w-full text-[16px] border-[black] outline-[1.5px] outline-primary px-3 py-2 mt-1 rounded-md"
            />
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <div>{formik.errors.currentPassword}</div>
            ) : null}
          </div>

          <div className="my-3">
            <label
              htmlFor="password"
              className="block font-semibold text-[16px]"
            >
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-[1.5px] w-full text-[16px] border-[black] outline-[1.5px] outline-primary px-3 py-2 mt-1 rounded-md"
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div>{formik.errors.newPassword}</div>
            ) : null}
          </div>
          <div className="my-3">
            <label
              htmlFor="password"
              className="block font-semibold text-[16px]"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-[1.5px] w-full text-[16px] border-[black] outline-[1.5px] outline-primary px-3 py-2 mt-1 rounded-md"
            />
            {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword ? (
              <div>{formik.errors.confirmNewPassword}</div>
            ) : null}
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
