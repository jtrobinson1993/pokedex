import classnames from "classnames";

export interface DPadButtonProps
  extends React.HtmlHTMLAttributes<HTMLButtonElement> {}

export const DPadButton = ({
  children,
  className,
  ...props
}: DPadButtonProps) => {
  return (
    <button className={classnames("dpad__button", className)} {...props}>
      <span className="visually-hidden">{children}</span>
    </button>
  );
};
