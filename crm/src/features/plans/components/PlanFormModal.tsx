import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../../../shared/ui/Modal";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { Button } from "../../../shared/ui/Button";
import { useCreatePlan } from "../hooks/useCreatePlan";
import { useUpdatePlan } from "../hooks/useUpdatePlan";
import { planFormSchema, type Plan, type PlanFormInput, type PlanFormOutput } from "../schemas/planSchema";

type PlanFormModalProps = {
  plan?: Plan;
  onClose: () => void;
};

export function PlanFormModal({ plan, onClose }: PlanFormModalProps) {
  const createPlan = useCreatePlan();
  const updatePlan = useUpdatePlan();
  const isEditing = Boolean(plan);
  const isSubmitting = createPlan.isPending || updatePlan.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanFormInput, unknown, PlanFormOutput>({
    resolver: zodResolver(planFormSchema),
    defaultValues: plan
      ? {
          name: plan.name,
          mode: plan.mode,
          duration: plan.duration,
          monthly_value: plan.monthly_value,
          total_value: plan.total_value,
          status: plan.status,
        }
      : undefined,
  });

  const onSubmit = handleSubmit((values) => {
    const onSuccess = { onSuccess: onClose };
    if (plan) {
      updatePlan.mutate({ ...values, id: plan.id }, onSuccess);
    } else {
      createPlan.mutate(values, onSuccess);
    }
  });

  return (
    <Modal
      open
      onClose={onClose}
      title={isEditing ? "Editar plano" : "Novo plano"}
      footer={
        <div className="flex justify-end gap-2">
          <Button variantTone="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting}>
            Salvar
          </Button>
        </div>
      }
    >
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Nome" errorMessage={errors.name?.message} {...register("name")} />
        <Input label="Modalidade" errorMessage={errors.mode?.message} {...register("mode")} />
        <Input
          label="Duração (dias)"
          type="number"
          errorMessage={errors.duration?.message}
          {...register("duration")}
        />
        <Input
          label="Valor mensal (R$)"
          type="number"
          errorMessage={errors.monthly_value?.message}
          {...register("monthly_value")}
        />
        <Input
          label="Valor total (R$)"
          type="number"
          errorMessage={errors.total_value?.message}
          {...register("total_value")}
        />
        <Select label="Status" errorMessage={errors.status?.message} {...register("status")}>
          <option value="ATIVO">Ativo</option>
          <option value="INATIVO">Inativo</option>
        </Select>
      </form>
    </Modal>
  );
}
