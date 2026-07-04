import { Badge } from "../../../shared/ui/Badge";
import type { LeadStatus } from "../schemas/leadSchema";

const statusLabel: Record<LeadStatus, string> = {
  CRIADO: "Criado",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDO: "Convertido",
  INATIVO: "Inativo",
};

const statusColor: Record<LeadStatus, "blue" | "amber" | "green" | "gray"> = {
  CRIADO: "blue",
  EM_ANDAMENTO: "amber",
  CONCLUIDO: "green",
  INATIVO: "gray",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return <Badge value={statusLabel[status]} color={statusColor[status]} />;
}
