import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { Button } from "../../../shared/ui/Button";
import { Badge } from "../../../shared/ui/Badge";
import { useCreateFeedback } from "../hooks/useCreateFeedback";
import { useDeleteFeedback } from "../hooks/useDeleteFeedback";
import { feedbackFormSchema, type ClientDetail, type FeedbackFormValues } from "../schemas/clientSchema";

type ClientFeedbackTabProps = {
  client: ClientDetail;
};

const npsColor = {
  PROMOTOR: "green",
  PASSIVO: "amber",
  DETRATOR: "red",
} as const;

export function ClientFeedbackTab({ client }: ClientFeedbackTabProps) {
  const createFeedback = useCreateFeedback();
  const deleteFeedback = useDeleteFeedback();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
  });

  const onSubmit = handleSubmit((values) => {
    createFeedback.mutate({ ...values, clientId: client.id }, { onSuccess: () => reset() });
  });

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input label="Feedback" errorMessage={errors.feedback?.message} {...register("feedback")} />
        <div className="w-48">
          <Select label="NPS" errorMessage={errors.feedback_nps?.message} {...register("feedback_nps")}>
            <option value="PROMOTOR">Promotor</option>
            <option value="PASSIVO">Passivo</option>
            <option value="DETRATOR">Detrator</option>
          </Select>
        </div>
        <div>
          <Button type="submit" disabled={createFeedback.isPending}>
            Adicionar feedback
          </Button>
        </div>
      </form>

      <ul className="flex flex-col gap-2">
        {client.clientFeedbacks.length === 0 && (
          <li className="text-sm text-cream/50">Nenhum feedback registrado.</li>
        )}
        {client.clientFeedbacks.map((feedback) => (
          <li
            key={feedback.id}
            className="flex items-center justify-between rounded-xl border border-bone/10 px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <Badge value={feedback.feedback_nps} color={npsColor[feedback.feedback_nps]} />
              <span>{feedback.feedback}</span>
            </div>
            <Button
              size="sm"
              variantTone="danger"
              onClick={() => deleteFeedback.mutate({ clientId: client.id, feedbackId: feedback.id })}
            >
              Excluir
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
