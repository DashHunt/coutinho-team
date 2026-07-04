import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils";

type ButtonTone = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variantTone?: ButtonTone;
  size?: ButtonSize;
};

const toneClasses: Record<ButtonTone, string> = {
  primary: "bg-gradient-to-r from-ember to-ember-deep text-cream shadow-lg shadow-ember/20 hover:brightness-110",
  secondary: "bg-raised text-cream border border-bone/15 hover:bg-raised/70",
  danger: "bg-red-600/90 text-cream hover:bg-red-500",
  ghost: "bg-transparent text-cream/70 hover:text-cream",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variantTone = "primary", size = "md", className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        "rounded-full font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        toneClasses[variantTone],
        sizeClasses[size],
        className || "",
      )}
      {...props}
    />
  );
});
