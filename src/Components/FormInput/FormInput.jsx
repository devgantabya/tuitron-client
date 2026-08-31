import React from "react";
import { Label } from "../UI/Label";
import { Input } from "../UI/Input";

const FormInput = ({
  label,
  name,
  type = "text",
  register,
  required,
  placeholder,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        {...register(name, { required })}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
