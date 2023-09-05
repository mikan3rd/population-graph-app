import { css, LinariaClassName } from "@linaria/core";
import { InputHTMLAttributes } from "react";

type Props = {
  className?: LinariaClassName;
  children: React.ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export const Checkbox = (props: Props) => {
  const { className, children, id, onChange, ...inputProps } = props;
  return (
    <label
      htmlFor={id}
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
        type="checkbox"
        id={id}
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
