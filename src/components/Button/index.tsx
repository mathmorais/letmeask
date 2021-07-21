import React, { ButtonHTMLAttributes } from "react";
import "./styles.scss";

type Variations = "danger" | "cancel" | "transparent" | "outline";

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
