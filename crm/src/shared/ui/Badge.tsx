type BadgeColor = "blue" | "gray" | "red" | "green" | "amber";

type BadgeProps = {
  value: string;
  color?: BadgeColor;
};

const colorClasses: Record<BadgeColor, string> = {
  blue: "bg-blue-500/15 text-blue-300",
  gray: "bg-bone/10 text-cream/60",
  red: "bg-red-500/15 text-red-300",
  green: "bg-green-500/15 text-green-300",
  amber: "bg-amber-500/15 text-amber-300",
};

export function Badge({ value, color = "gray" }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${colorClasses[color]}`}>
      {value}
    </span>
  );
}
