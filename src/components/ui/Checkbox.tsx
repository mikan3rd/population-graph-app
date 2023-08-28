import { css } from "@linaria/core";
import { InputHTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = (props: Props) => {
  const { children, id, value, checked, onChange } = props;
  return (
    <div
      className={css`
        padding: 12px;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
      `}
    >
      <input type="checkbox" id={id} value={value} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};
