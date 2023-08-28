import { css } from "@linaria/core";
import { InputHTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = (props: Props) => {
  const { children, id, value, checked, onChange } = props;
  return (
    <label
      htmlFor={id}
      className={css`
        display: inline-block;
        padding: 12px;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
      `}
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
