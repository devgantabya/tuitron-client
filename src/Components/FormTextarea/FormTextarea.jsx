import React from "react";
import { Label } from "../UI/Label";
import { Textarea } from "../UI/Textarea";

const FormTextarea = ({ label, name, register, required, placeholder }) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        rows={4}
        {...register(name, { required })}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormTextarea;
