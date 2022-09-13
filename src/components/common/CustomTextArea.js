import React from "react";
import { TextareaAutosize } from "@material-ui/core";

export default function CustomTextArea({
  minRows,
  placeholder,
  name,
  value,
  onChange,
  variant,
}) {
  return (
    <TextareaAutosize
      name={name}
      value={value}
      onChange={onChange}
      minRows={minRows || 4}
      placeholder={placeholder}
      style={{ width: 200 }}
      variant={variant}
      fullWidth
    />
  );
}
