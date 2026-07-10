import { forwardRef, type HTMLAttributes, type TableHTMLAttributes } from "react";
import { cn } from "../lib/utils";

type TableProps = TableHTMLAttributes<HTMLTableElement>;
type TableHeadProps = HTMLAttributes<HTMLTableSectionElement>;
type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
type TableDataProps = HTMLAttributes<HTMLTableCellElement>;

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, ...props },
  ref,
) {
  return (
    <div className="w-full overflow-x-auto overflow-y-hidden rounded-md border border-bone/10 bg-elevated shadow-lg">
      <table
        ref={ref}
        className={cn("w-full min-w-[640px] text-left text-sm text-cream", className || "")}
        {...props}
      />
    </div>
  );
});

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(function TableHead(
  { className, ...props },
  ref,
) {
  return (
    <thead
      ref={ref}
      className={cn(
        "text-center border-t border-bone/15 rounded-lg bg-bone/5 text-cream/50",
        className || "",
      )}
      {...props}
    ></thead>
  );
});

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, ...props },
  ref,
) {
  return (
    <tr
      ref={ref}
      className={cn("border-b border-bone/15 text-cream/50", className || "")}
      {...props}
    ></tr>
  );
});

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableBody({ className, ...props }, ref) {
  return (
    <tbody ref={ref} className={cn("divide-y divide-bone/15", className || "")} {...props}></tbody>
  );
});

export const TableActions = forwardRef<HTMLTableCellElement, TableDataProps>(
  function TableActions({ className, ...props }, ref) {
    return (
      <td
        ref={ref}
        className={cn("grid auto-cols-3 grid-flow-col gap-2 py-2", className || "")}
        {...props}
      ></td>
    );
  },
);
