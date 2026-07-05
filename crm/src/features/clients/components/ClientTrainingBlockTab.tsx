import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";
import { useUpdateClientInfo } from "../hooks/useUpdateClientInfo";
import {
  clientInfoFormSchema,
  type ClientDetail,
  type ClientInfoFormValues,
} from "../schemas/clientSchema";

type ClientTrainingBlockTabProps = {
  client: ClientDetail;
};

export function ClientTrainingBlockTab({ client }: ClientTrainingBlockTabProps) {
  const updateClientInfo = useUpdateClientInfo();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientInfoFormValues>({
    resolver: zodResolver(clientInfoFormSchema),
    defaultValues: {
      block: client.clientInfo?.block ?? "",
      block_week: client.clientInfo?.block_week ?? "",
      previous_block: client.clientInfo?.previous_block ?? undefined,
      notes: client.clientInfo?.notes ?? undefined,
      sheet_link: client.clientInfo?.sheet_link ?? "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    updateClientInfo.mutate({ ...values, clientId: client.id });
  });

  if (!client.clientInfo) {
    return <p className="text-sm text-cream/50">Este cliente ainda não tem bloco de treino cadastrado.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input label="Bloco" errorMessage={errors.block?.message} {...register("block")} />
      <Input label="Semana do bloco" errorMessage={errors.block_week?.message} {...register("block_week")} />
      <Input
        label="Bloco anterior"
        errorMessage={errors.previous_block?.message}
        {...register("previous_block")}
      />
      <Input
        label="Link da planilha de treino"
        errorMessage={errors.sheet_link?.message}
        {...register("sheet_link")}
      />
      <div className="sm:col-span-2">
        <Input label="Observações" errorMessage={errors.notes?.message} {...register("notes")} />
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" disabled={updateClientInfo.isPending}>
          Salvar
        </Button>
      </div>
    </form>
  );
}
