import { Button } from "../../../shared/ui/Button";
import { PlanStatusBadge } from "./PlanStatusBadge";
import type { ClientListItem } from "../schemas/clientSchema";
import { Table, TableActions, TableBody, TableHead, TableRow } from "../../../shared/ui/Table";

type ClientsTableProps = {
  clients: ClientListItem[];
  showDeleted: boolean;
  onView: (client: ClientListItem) => void;
  onDelete: (client: ClientListItem) => void;
  onReactivate: (client: ClientListItem) => void;
};

export function ClientsTable({ clients, showDeleted, onView, onDelete, onReactivate }: ClientsTableProps) {
  if (clients.length === 0) {
    return <p className="py-8 text-center text-sm text-cream/50">Nenhum cliente encontrado.</p>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <th className="py-2">Nome</th>
          <th className="hidden md:table-cell py-2">E-mail</th>
          <th className="hidden md:table-cell py-2">Telefone</th>
          <th className="py-2">Plano atual</th>
          <th className="py-2">Conquistas</th>
          <th className="py-2">Ações</th>
        </TableRow>
      </TableHead>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id} className="text-center">
            <td className="py-2">{client.name}</td>
            <td className="hidden md:table-cell py-2">{client.email}</td>
            <td className="hidden md:table-cell py-2">{client.telephone_number}</td>
            <td className="py-2">
              {client.currentPlan ? (
                <div className="flex justify-center items-center gap-2">
                  <span>{client.currentPlan.plan.name}</span>
                  <PlanStatusBadge status={client.currentPlan.status} />
                </div>
              ) : (
                <span className="text-cream/40">Sem plano</span>
              )}
            </td>
            <td className="py-2">{client.achievementsCount}</td>
            <TableActions className="flex gap-2 py-2">
              {showDeleted ? (
                <Button size="sm" variantTone="secondary" onClick={() => onReactivate(client)}>
                  Reativar
                </Button>
              ) : (
                <>
                  <Button size="sm" variantTone="secondary" onClick={() => onView(client)}>
                    Ver
                  </Button>
                  <Button size="sm" variantTone="danger" onClick={() => onDelete(client)}>
                    Excluir
                  </Button>
                </>
              )}
            </TableActions>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
