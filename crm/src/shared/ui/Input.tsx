import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorMessage?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, errorMessage, className, type, ...props },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <label className="flex flex-col gap-1.5">
      {label && <span className="text-sm text-cream/70">{label}</span>}
      <span className="relative flex items-center">
        <input
          ref={ref}
          type={resolvedType}
          className={cn(
            "w-full rounded-full border bg-base/40 px-4 py-2.5 text-sm text-cream placeholder:text-cream/30 outline-none transition focus:border-ember focus:ring-1 focus:ring-ember",
            errorMessage ? "border-red-500" : "border-bone/15",
            isPassword ? "pr-16" : "",
            className || "",
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-4 flex items-center gap-1 text-xs text-cream/50 hover:text-cream"
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        )}
      </span>
      {errorMessage && <span className="text-sm text-red-400">{errorMessage}</span>}
    </label>
  );
});
