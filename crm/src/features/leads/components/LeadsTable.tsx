import { Button } from "../../../shared/ui/Button";
import { LeadStatusBadge } from "./LeadStatusBadge";
import type { Lead } from "../schemas/leadSchema";
import { Table, TableActions, TableBody, TableHead, TableRow } from "../../../shared/ui/Table";

type LeadsTableProps = {
  leads: Lead[];
  showDeleted: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onReactivate: (lead: Lead) => void;
  onConvert: (lead: Lead) => void;
};

export function LeadsTable({
  leads,
  showDeleted,
  onEdit,
  onDelete,
  onReactivate,
  onConvert,
}: LeadsTableProps) {
  if (leads.length === 0) {
    return <p className="py-8 text-center text-sm text-cream/50">Nenhum lead encontrado.</p>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <th className="py-2">Nome</th>
          <th className="hidden md:table-cell py-2">E-mail</th>
          <th className="hidden md:table-cell py-2">Telefone</th>
          <th className="hidden md:table-cell py-2">Plano sugerido</th>
          <th className="py-2">Status</th>
          <th className="py-2">Ações</th>
        </TableRow>
      </TableHead>
      <TableBody>
        {leads.map((lead) => (
          <TableRow key={lead.id} className="text-center">
            <td className="py-2">{lead.name}</td>
            <td className="hidden md:table-cell py-2">{lead.email}</td>
            <td className="hidden md:table-cell py-2">{lead.telephone_number}</td>
            <td className="hidden md:table-cell py-2">{lead.selected_plan}</td>
            <td className="py-2">
              <LeadStatusBadge status={lead.status} />
            </td>
            <TableActions>
              {showDeleted ? (
                <Button size="sm" variantTone="secondary" onClick={() => onReactivate(lead)}>
                  Reativar
                </Button>
              ) : (
                <>
                  <Button size="sm" variantTone="secondary" onClick={() => onEdit(lead)}>
                    Editar
                  </Button>
                  <Button size="sm" variantTone="danger" onClick={() => onDelete(lead)}>
                    Excluir
                  </Button>
                  {lead.status !== "CONCLUIDO" && (
                    <Button size="sm" variantTone="primary" onClick={() => onConvert(lead)}>
                      Converter
                    </Button>
                  )}
                </>
              )}
            </TableActions>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
