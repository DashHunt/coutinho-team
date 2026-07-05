import { Badge } from "../../../shared/ui/Badge";
import type { PlanStatus } from "../schemas/clientSchema";

const statusLabel: Record<PlanStatus, string> = {
  ATIVO: "Ativo",
  EM_RENOVACAO: "Em renovação",
  INATIVO: "Inativo",
};

const statusColor: Record<PlanStatus, "green" | "amber" | "gray"> = {
  ATIVO: "green",
  EM_RENOVACAO: "amber",
  INATIVO: "gray",
};

export function PlanStatusBadge({ status }: { status: PlanStatus }) {
  return <Badge value={statusLabel[status]} color={statusColor[status]} />;
}
