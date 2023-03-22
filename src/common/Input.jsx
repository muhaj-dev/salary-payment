import React from "react";

const Input = ({ label, placeholder, type, value, onChange, formik }) => {
  return (
    <div className="my-3">
      <label className="block font-semibold text-[16px]">
        {label}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className="border-[1.5px] w-full text-[16px] border-[black] outline-[1.5px] outline-primary px-3 py-1 mt-1 rounded-sm"
      />
          {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}

    </div>
  );
};

export default Input;
