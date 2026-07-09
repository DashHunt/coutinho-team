import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";
import { useUpdateClient } from "../hooks/useUpdateClient";
import { clientFormSchema, type ClientDetail, type ClientFormValues } from "../schemas/clientSchema";

type ClientGeneralTabProps = {
  client: ClientDetail;
};

export function ClientGeneralTab({ client }: ClientGeneralTabProps) {
  const updateClient = useUpdateClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: client.name,
      email: client.email,
      telephone_number: client.telephone_number,
      birth_date: client.birth_date?.slice(0, 10) ?? "",
      gender: client.gender,
      document: client.document ?? undefined,
      objectives: client.objectives ?? undefined,
      history: client.history ?? undefined,
    },
  });

  const onSubmit = handleSubmit((values) => {
    updateClient.mutate({ ...values, id: client.id });
  });

  return (
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
      <Input label="Objetivos" errorMessage={errors.objectives?.message} {...register("objectives")} />
      <Input label="Histórico" errorMessage={errors.history?.message} {...register("history")} />

      <div className="sm:col-span-2">
        <Button type="submit" disabled={updateClient.isPending}>
          Salvar
        </Button>
      </div>
    </form>
  );
}
