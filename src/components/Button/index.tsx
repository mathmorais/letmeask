import React, { ButtonHTMLAttributes } from "react";
import "./styles.scss";

type Variations = "transparent" | "outlined";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variation?: Variations;
}

export const Button: React.FC<IButton> = ({
  children,
  variation,
  ...others
}) => {
  let className = "button";

  if (variation) {
    className += " " + variation;
  }

  return (
    <button className={className} {...others}>
      {children}
    </button>
  );
};
