import { css, LinariaClassName } from "@linaria/core";
import { InputHTMLAttributes } from "react";

type Props = {
  className?: LinariaClassName;
  children: React.ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export const Checkbox = (props: Props) => {
  const { className, children, id, value, checked, onChange } = props;
  return (
    <label
      htmlFor={id}
      className={
        `${className} ` +
        css`
          display: inline-block;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        `
      }
    >
      <input
        type="checkbox"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        className={css`
          margin-right: 4px;
        `}
      />
      {children}
    </label>
  );
};
