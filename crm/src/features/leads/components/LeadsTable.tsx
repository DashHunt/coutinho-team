import { Button } from "../../../shared/ui/Button";
import { LeadStatusBadge } from "./LeadStatusBadge";
import type { Lead } from "../schemas/leadSchema";

type LeadsTableProps = {
  leads: Lead[];
  showDeleted: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onReactivate: (lead: Lead) => void;
  onConvert: (lead: Lead) => void;
};

export function LeadsTable({ leads, showDeleted, onEdit, onDelete, onReactivate, onConvert }: LeadsTableProps) {
  if (leads.length === 0) {
    return <p className="py-8 text-center text-sm text-cream/50">Nenhum lead encontrado.</p>;
  }

  return (
    <table className="w-full text-left text-sm text-cream">
      <thead>
        <tr className="border-b border-bone/15 text-cream/50">
          <th className="py-2">Nome</th>
          <th className="py-2">E-mail</th>
          <th className="py-2">Telefone</th>
          <th className="py-2">Plano sugerido</th>
          <th className="py-2">Status</th>
          <th className="py-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id} className="border-b border-bone/10">
            <td className="py-2">{lead.name}</td>
            <td className="py-2">{lead.email}</td>
            <td className="py-2">{lead.telephone_number}</td>
            <td className="py-2">{lead.selected_plan}</td>
            <td className="py-2">
              <LeadStatusBadge status={lead.status} />
            </td>
            <td className="flex gap-2 py-2">
              {showDeleted ? (
                <Button size="sm" variantTone="secondary" onClick={() => onReactivate(lead)}>
                  Reativar
                </Button>
              ) : (
                <>
                  <Button size="sm" variantTone="secondary" onClick={() => onEdit(lead)}>
                    Editar
                  </Button>
                  {lead.status !== "CONCLUIDO" && (
                    <Button size="sm" variantTone="primary" onClick={() => onConvert(lead)}>
                      Converter em Cliente
                    </Button>
                  )}
                  <Button size="sm" variantTone="danger" onClick={() => onDelete(lead)}>
                    Excluir
                  </Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
