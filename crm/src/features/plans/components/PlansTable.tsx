import { Button } from "../../../shared/ui/Button";
import { PlanAvailabilityBadge } from "./PlanAvailabilityBadge";
import type { Plan } from "../schemas/planSchema";

type PlansTableProps = {
  plans: Plan[];
  showDeleted: boolean;
  onEdit: (plan: Plan) => void;
  onDelete: (plan: Plan) => void;
  onReactivate: (plan: Plan) => void;
};

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function PlansTable({ plans, showDeleted, onEdit, onDelete, onReactivate }: PlansTableProps) {
  if (plans.length === 0) {
    return <p className="py-8 text-center text-sm text-cream/50">Nenhum plano encontrado.</p>;
  }

  return (
    <table className="w-full text-left text-sm text-cream">
      <thead>
        <tr className="border-b border-bone/15 text-cream/50">
          <th className="py-2">Nome</th>
          <th className="py-2">Modalidade</th>
          <th className="py-2">Duração (dias)</th>
          <th className="py-2">Valor mensal</th>
          <th className="py-2">Valor total</th>
          <th className="py-2">Status</th>
          <th className="py-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {plans.map((plan) => (
          <tr key={plan.id} className="border-b border-bone/10">
            <td className="py-2">{plan.name}</td>
            <td className="py-2">{plan.mode}</td>
            <td className="py-2">{plan.duration}</td>
            <td className="py-2">{formatCurrency(plan.monthly_value)}</td>
            <td className="py-2">{formatCurrency(plan.total_value)}</td>
            <td className="py-2">
              <PlanAvailabilityBadge status={plan.status} />
            </td>
            <td className="flex gap-2 py-2">
              {showDeleted ? (
                <Button size="sm" variantTone="secondary" onClick={() => onReactivate(plan)}>
                  Reativar
                </Button>
              ) : (
                <>
                  <Button size="sm" variantTone="secondary" onClick={() => onEdit(plan)}>
                    Editar
                  </Button>
                  <Button size="sm" variantTone="danger" onClick={() => onDelete(plan)}>
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
