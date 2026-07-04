import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../../../shared/ui/Modal";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { Button } from "../../../shared/ui/Button";
import { useCreateLead } from "../hooks/useCreateLead";
import { useUpdateLead } from "../hooks/useUpdateLead";
import { leadFormSchema, type Lead, type LeadFormValues } from "../schemas/leadSchema";

type LeadFormModalProps = {
  lead?: Lead;
  onClose: () => void;
};

export function LeadFormModal({ lead, onClose }: LeadFormModalProps) {
  const createLead = useCreateLead();
  const updateLead = useUpdateLead();
  const isEditing = Boolean(lead);
  const isSubmitting = createLead.isPending || updateLead.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: lead
      ? {
          name: lead.name,
          email: lead.email,
          telephone_number: lead.telephone_number,
          history: lead.history,
          selected_plan: lead.selected_plan,
          status: lead.status,
        }
      : undefined,
  });

  const onSubmit = handleSubmit((values) => {
    const onSuccess = { onSuccess: onClose };
    if (lead) {
      updateLead.mutate({ ...values, id: lead.id }, onSuccess);
    } else {
      createLead.mutate(values, onSuccess);
    }
  });

  return (
    <Modal
      open
      onClose={onClose}
      title={isEditing ? "Editar lead" : "Novo lead"}
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
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input label="Nome" errorMessage={errors.name?.message} {...register("name")} />
        <Input label="E-mail" errorMessage={errors.email?.message} {...register("email")} />
        <Input
          label="Telefone"
          errorMessage={errors.telephone_number?.message}
          {...register("telephone_number")}
        />
        <Input
          label="Plano sugerido"
          errorMessage={errors.selected_plan?.message}
          {...register("selected_plan")}
        />
        <Input label="Histórico" errorMessage={errors.history?.message} {...register("history")} />
        {isEditing && (
          <Select label="Status" {...register("status")}>
            <option value="CRIADO">Criado</option>
            <option value="EM_ANDAMENTO">Em andamento</option>
            <option value="CONCLUIDO">Convertido</option>
            <option value="INATIVO">Inativo</option>
          </Select>
        )}
      </form>
    </Modal>
  );
}
