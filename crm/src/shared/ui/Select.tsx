import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  errorMessage?: string;
};

/**
 * Select nativo: um widget de biblioteca (ex: o Select do antigo @material-tailwind/react)
 * não teria um <select> real por baixo, então não funcionaria com react-hook-form via
 * `register()` sem envolver cada uso em `Controller`. Um <select> nativo evita essa
 * complexidade extra para os poucos dropdowns simples que o app precisa.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, errorMessage, className, children, ...props },
  ref,
) {
  return (
    <label className="flex flex-col gap-1.5">
      {label && <span className="text-sm text-cream/70">{label}</span>}
      <select
        ref={ref}
        className={cn(
          "rounded-full border bg-base/40 px-4 py-2.5 text-sm text-cream outline-none transition focus:border-ember focus:ring-1 focus:ring-ember",
          errorMessage ? "border-red-500" : "border-bone/15",
          className || "",
        )}
        {...props}
      >
        {children}
      </select>
      {errorMessage && <span className="text-sm text-red-400">{errorMessage}</span>}
    </label>
  );
});
