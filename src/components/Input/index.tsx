import { forwardRef } from "react";
import { InputHTMLAttributes } from "react";
import "./styles.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hintText?: string;
  maxNumberLength?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="input-container">
      <input ref={ref} {...props} />
      {props.hintText != null && <span>{props.hintText}</span>}
    </div>
  );
});
