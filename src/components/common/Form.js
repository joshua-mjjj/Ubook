import React from "react";

export default function Form({ onSubmit, children, ...others }) {
  return (
    <form onSubmit={onSubmit} {...others}>
      {children}
    </form>
  );
}
