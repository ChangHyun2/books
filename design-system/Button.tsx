import { forwardRef } from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, disabled, className }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
