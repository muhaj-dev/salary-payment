import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const PasswordInput = ( { label, placeholder, value, onChange }) => {
  return (
    <div className="my-3">
      <label className="block text-blue font-semibold text-[16px]">
        {label}
      </label>
      <div className="relative w-full">
        <input
          placeholder={placeholder}
          type="password"
          value={value}
          onChange={onChange}
          className="border-[1.5px] w-full text-[16px] border-[black] outline-[1.5px] outline-primary px-3 py-1 mt-1 rounded-sm"
        />
        <div className="absolute right-3 top-2.5">
            <AiOutlineEye className="h-[20px] w-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;

