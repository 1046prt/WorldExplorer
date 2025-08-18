import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "default" | "sm" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "default", ...props }, ref) => {
    const baseClasses = "input";
    const sizeClasses = {
      default: "",
      sm: "input-sm",
      lg: "input-lg",
    };

    const classes = cn(baseClasses, sizeClasses[size], className);

    return <input type={type} className={classes} ref={ref} {...props} />;
  }
);
Input.displayName = "Input";

export { Input };
