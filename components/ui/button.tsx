import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const buttonVariants = (props?: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}) => {
  const variant = props?.variant || "default";
  const size = props?.size || "default";

  const variantClasses = {
    default: "btn-primary",
    destructive: "btn-destructive",
    outline: "btn-outline",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    link: "btn-ghost",
  };

  const sizeClasses = {
    default: "btn-md",
    sm: "btn-sm",
    lg: "btn-lg",
    icon: "btn-icon",
  };

  return `btn ${variantClasses[variant]} ${sizeClasses[size]}`;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (asChild) {
      return <span className={classes} {...props} />;
    }

    return <button className={classes} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
