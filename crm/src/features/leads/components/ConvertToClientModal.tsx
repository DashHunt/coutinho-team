import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "../../../shared/ui/Modal";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { Button } from "../../../shared/ui/Button";
import { useConvertLeadToClient } from "../hooks/useConvertLeadToClient";
import { usePlanOptions } from "../hooks/usePlanOptions";
import type { Lead } from "../schemas/leadSchema";

const convertFormSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  telephone_number: z.string().min(1, "Telefone obrigatório"),
  history: z.string().optional(),
  birth_date: z.string().min(1, "Data de nascimento obrigatória"),
  gender: z.string().min(1, "Gênero obrigatório"),
  document: z.string().optional(),
  objectives: z.string().optional(),
  plan_id: z.coerce.number().min(1, "Selecione um plano"),
  purchased_date: z.string().min(1, "Data de compra obrigatória"),
  block: z.string().min(1, "Bloco obrigatório"),
  block_week: z.string().min(1, "Semana obrigatória"),
  previous_block: z.string().optional(),
  notes: z.string().optional(),
  sheet_link: z.string().min(1, "Link da planilha obrigatório"),
});

type ConvertToClientModalProps = {
  lead: Lead;
  onClose: () => void;
};

export function ConvertToClientModal({ lead, onClose }: ConvertToClientModalProps) {
  const convertLead = useConvertLeadToClient();
  const planOptions = usePlanOptions();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.input<typeof convertFormSchema>, unknown, z.output<typeof convertFormSchema>>({
    resolver: zodResolver(convertFormSchema),
    defaultValues: {
      name: lead.name,
      email: lead.email,
      telephone_number: lead.telephone_number,
      history: lead.history,
    },
  });

  const onSubmit = handleSubmit((values) => {
    convertLead.mutate({ ...values, lead_id: lead.id }, { onSuccess: onClose });
  });

  return (
    <Modal
      open
      onClose={onClose}
      title={`Converter "${lead.name}" em cliente`}
      footer={
        <div className="flex justify-end gap-2">
          <Button variantTone="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onSubmit} disabled={convertLead.isPending}>
            Converter
          </Button>
        </div>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <p className="text-sm text-cream/60">Plano sugerido pelo lead: {lead.selected_plan || "—"}</p>

        <Input label="Nome" errorMessage={errors.name?.message} {...register("name")} />
        <Input label="E-mail" errorMessage={errors.email?.message} {...register("email")} />
        <Input
          label="Telefone"
          errorMessage={errors.telephone_number?.message}
          {...register("telephone_number")}
        />
        <Input label="Data de nascimento" type="date" errorMessage={errors.birth_date?.message} {...register("birth_date")} />
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
        <Input label="Semana do bloco" errorMessage={errors.block_week?.message} {...register("block_week")} />
        <Input
          label="Link da planilha de treino"
          errorMessage={errors.sheet_link?.message}
          {...register("sheet_link")}
        />
        <Input label="Objetivos" errorMessage={errors.objectives?.message} {...register("objectives")} />
        <Input label="Observações" errorMessage={errors.notes?.message} {...register("notes")} />
      </form>
    </Modal>
  );
}
