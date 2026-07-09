import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../../../shared/ui/Modal";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { Button } from "../../../shared/ui/Button";
import { useCreateClient } from "../hooks/useCreateClient";
import { usePlanOptions } from "../hooks/usePlanOptions";
import {
  createClientFormSchema,
  type CreateClientFormInput,
  type CreateClientFormOutput,
} from "../schemas/clientSchema";

type ClientFormModalProps = {
  onClose: () => void;
};

export function ClientFormModal({ onClose }: ClientFormModalProps) {
  const createClient = useCreateClient();
  const planOptions = usePlanOptions();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientFormInput, unknown, CreateClientFormOutput>({
    resolver: zodResolver(createClientFormSchema),
  });

  const onSubmit = handleSubmit((values) => {
    createClient.mutate(values, { onSuccess: onClose });
  });

  return (
    <Modal
      open
      onClose={onClose}
      title="Novo cliente"
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <Button variantTone="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onSubmit} disabled={createClient.isPending}>
            Criar
          </Button>
        </div>
      }
    >
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Nome" errorMessage={errors.name?.message} {...register("name")} />
        <Input label="E-mail" errorMessage={errors.email?.message} {...register("email")} />
        <Input
          label="Telefone"
          errorMessage={errors.telephone_number?.message}
          {...register("telephone_number")}
        />
        <Input
          label="Data de nascimento"
          type="date"
          errorMessage={errors.birth_date?.message}
          {...register("birth_date")}
        />
        <Input label="Gênero" errorMessage={errors.gender?.message} {...register("gender")} />
        <Input label="Documento" errorMessage={errors.document?.message} {...register("document")} />

        <Select label="Plano" errorMessage={errors.plan_id?.message} {...register("plan_id")}>
          <option value="">Selecione um plano</option>
          {planOptions.data?.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name} ({plan.mode})
            </option>
          ))}
        </Select>
        <Input
          label="Data da compra"
          type="date"
          errorMessage={errors.purchased_date?.message}
          {...register("purchased_date")}
        />

        <Input label="Bloco" errorMessage={errors.block?.message} {...register("block")} />
        <Input
          label="Semana do bloco"
          errorMessage={errors.block_week?.message}
          {...register("block_week")}
        />
        <Input
          label="Link da planilha de treino"
          errorMessage={errors.sheet_link?.message}
          {...register("sheet_link")}
        />
        <Input label="Objetivos" errorMessage={errors.objectives?.message} {...register("objectives")} />
        <Input label="Histórico" errorMessage={errors.history?.message} {...register("history")} />
        <Input label="Observações" errorMessage={errors.notes?.message} {...register("notes")} />
      </form>
    </Modal>
  );
}
