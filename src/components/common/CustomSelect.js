import React from "react";
import { Select, FormControl, InputLabel } from "@material-ui/core";
export default function CustomSelect({
  label,
  value,
  id,
  labelId,
  onChange,
  children,
  name,
  variant,
  size,
  ...others
}) {
  return (
    <FormControl fullWidth variant={variant} size={size}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        name={name}
        {...others}
      >
        {children}
      </Select>
    </FormControl>
  );
}
