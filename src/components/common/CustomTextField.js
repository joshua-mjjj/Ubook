import React from "react";
import { TextField, Box } from "@material-ui/core";
export default function CustomTextField({
  id,
  label,
  variant,
  name,
  value,
  onChange,
}) {
  return (
    <TextField
      id={id}
      label={label}
      variant={variant}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
    />
  );
}
