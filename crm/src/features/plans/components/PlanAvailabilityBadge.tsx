import { Badge } from "../../../shared/ui/Badge";
import type { PlanAvailability } from "../schemas/planSchema";

const statusLabel: Record<PlanAvailability, string> = {
  ATIVO: "Ativo",
  INATIVO: "Inativo",
};

const statusColor: Record<PlanAvailability, "green" | "gray"> = {
  ATIVO: "green",
  INATIVO: "gray",
};

export function PlanAvailabilityBadge({ status }: { status: PlanAvailability }) {
  return <Badge value={statusLabel[status]} color={statusColor[status]} />;
}
