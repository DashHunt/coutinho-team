import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { Button } from "../../../shared/ui/Button";
import { PlanStatusBadge } from "./PlanStatusBadge";
import { useAddPlanHistory } from "../hooks/useAddPlanHistory";
import { useUpdatePlanHistoryStatus } from "../hooks/useUpdatePlanHistoryStatus";
import { usePlanOptions } from "../hooks/usePlanOptions";
import {
  planHistoryFormSchema,
  planStatusSchema,
  type ClientDetail,
  type PlanHistoryFormInput,
  type PlanHistoryFormOutput,
  type PlanStatus,
} from "../schemas/clientSchema";

type ClientPlansTabProps = {
  client: ClientDetail;
};

export function ClientPlansTab({ client }: ClientPlansTabProps) {
  const addPlanHistory = useAddPlanHistory();
  const updatePlanHistoryStatus = useUpdatePlanHistoryStatus();
  const planOptions = usePlanOptions();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlanHistoryFormInput, unknown, PlanHistoryFormOutput>({
    resolver: zodResolver(planHistoryFormSchema),
  });

  const onSubmit = handleSubmit((values) => {
    addPlanHistory.mutate({ ...values, clientId: client.id }, { onSuccess: () => reset() });
  });

  const sortedHistory = [...client.clientPlanHistories].sort((first, second) =>
    (second.purchased_date ?? "").localeCompare(first.purchased_date ?? ""),
  );

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={onSubmit} className="flex flex-wrap items-end gap-4">
        <div className="w-48">
          <Select label="Novo plano" errorMessage={errors.plan_id?.message} {...register("plan_id")}>
            <option value="">Selecione um plano</option>
            {planOptions.data?.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} ({plan.mode})
              </option>
            ))}
          </Select>
        </div>
        <div className="w-48">
          <Input
            label="Data da compra"
            type="date"
            errorMessage={errors.purchased_date?.message}
            {...register("purchased_date")}
          />
        </div>
        <Button type="submit" disabled={addPlanHistory.isPending}>
          Atribuir / Renovar
        </Button>
      </form>

      <table className="w-full text-left text-sm text-cream">
        <thead>
          <tr className="border-b border-bone/15 text-cream/50">
            <th className="py-2">Plano</th>
            <th className="py-2">Comprado em</th>
            <th className="py-2">Vence em</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map((history) => (
            <tr key={history.id} className="border-b border-bone/10">
              <td className="py-2">{history.Plan?.name ?? "—"}</td>
              <td className="py-2">{history.purchased_date?.slice(0, 10)}</td>
              <td className="py-2">{history.expiration_date?.slice(0, 10)}</td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <PlanStatusBadge status={history.status} />
                  <Select
                    value={history.status}
                    onChange={(event) =>
                      updatePlanHistoryStatus.mutate({
                        clientId: client.id,
                        historyId: history.id,
                        status: event.target.value as PlanStatus,
                      })
                    }
                  >
                    {planStatusSchema.options.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
