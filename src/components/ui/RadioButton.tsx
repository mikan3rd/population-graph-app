import { css, LinariaClassName } from "@linaria/core";
import { InputHTMLAttributes } from "react";

type Props = {
  className?: LinariaClassName;
  children: React.ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export const RadioButton = (props: Props) => {
  const { className, children, onChange, ...inputProps } = props;
  return (
    <label
      className={
        `${className} ` +
        css`
          display: inline-flex;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          align-items: center;
        `
      }
    >
      <input
        type="radio"
        onChange={onChange}
        {...inputProps}
        className={css`
          margin-right: 4px;
        `}
      />
      {children}
    </label>
  );
};
