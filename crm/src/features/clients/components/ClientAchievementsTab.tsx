import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { Button } from "../../../shared/ui/Button";
import { useCreateAchievement } from "../hooks/useCreateAchievement";
import { useDeleteAchievement } from "../hooks/useDeleteAchievement";
import {
  achievementFormSchema,
  type AchievementFormValues,
  type ClientDetail,
} from "../schemas/clientSchema";

type ClientAchievementsTabProps = {
  client: ClientDetail;
};

export function ClientAchievementsTab({ client }: ClientAchievementsTabProps) {
  const createAchievement = useCreateAchievement();
  const deleteAchievement = useDeleteAchievement();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementFormSchema),
  });

  const onSubmit = handleSubmit((values) => {
    createAchievement.mutate({ ...values, clientId: client.id }, { onSuccess: () => reset() });
  });

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Evento" errorMessage={errors.event?.message} {...register("event")} />
        <Input
          label="Data"
          type="date"
          errorMessage={errors.event_date?.message}
          {...register("event_date")}
        />
        <Select label="Nível" errorMessage={errors.event_level?.message} {...register("event_level")}>
          <option value="ESTADUAL">Estadual</option>
          <option value="NACIONAL">Nacional</option>
          <option value="INTERNACIONAL">Internacional</option>
        </Select>
        <Select
          label="Resultado"
          errorMessage={errors.event_achievement?.message}
          {...register("event_achievement")}
        >
          <option value="OURO">Ouro</option>
          <option value="PRATA">Prata</option>
          <option value="BRONZE">Bronze</option>
          <option value="RECORDE">Recorde</option>
          <option value="PARTICIPACAO">Participação</option>
        </Select>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={createAchievement.isPending}>
            Adicionar conquista
          </Button>
        </div>
      </form>

      <ul className="flex flex-col gap-2">
        {client.clientAchiviments.length === 0 && (
          <li className="text-sm text-cream/50">Nenhuma conquista cadastrada.</li>
        )}
        {client.clientAchiviments.map((achievement) => (
          <li
            key={achievement.id}
            className="flex items-center justify-between rounded-xl border border-bone/10 px-4 py-2"
          >
            <span>
              {achievement.event} — {achievement.event_level} — {achievement.event_achievement} (
              {achievement.event_date?.slice(0, 10)})
            </span>
            <Button
              size="sm"
              variantTone="danger"
              onClick={() =>
                deleteAchievement.mutate({ clientId: client.id, achievementId: achievement.id })
              }
            >
              Excluir
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
