import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseClasses = "badge";
  const variantClasses = {
    default: "badge-default",
    secondary: "badge-secondary",
    destructive: "badge-destructive",
    outline: "badge-outline",
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}

export { Badge };
