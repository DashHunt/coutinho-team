import { Loader } from "lucide-react";
import { useGetFeedbacks } from "../queries/ClientQueries";
import { Card } from "./ui/Card";

interface Testimonial {
  id: number;
  client_id: number;
  feedback: string;
  feedback_nps: "PROMOTOR" | "PASSIVO" | "DETRATOR";
  created_date: Date;
  deleted_date: Date | null;
  modificated_date: Date;
  Client: {
    name: string;
  };
}

export default function Depoimentos() {
  const { data, isLoading, isError, error } = useGetFeedbacks();

  return (
    <section id="depoimentos" className="py-[90px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <p className="font-body text-[13px] font-bold uppercase tracking-[2.5px] text-ember mb-3">
            Quem treina, recomenda
          </p>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] leading-[1.15]">
            O que dizem nossos alunos
          </h2>
        </div>

        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader className="animate-spin text-ember" />
          </div>
        )}

        {isError && (
          <div className="text-center text-cream/50 py-6">
            Erro ao carregar depoimentos: {error.message}
          </div>
        )}

        {!isLoading && !isError && !data?.length && (
          <div className="text-center text-cream/40">
            Nenhum depoimento disponível no momento.
          </div>
        )}

        {!isLoading && !isError && !!data?.length && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
            {data?.map((feedback: Testimonial) => (
              <Card key={feedback.id} variant="elevated" hover="scale" padding="md" rounded="lg">
                <div className="w-12 h-12 rounded-full bg-ember-deep text-bone flex items-center justify-center font-display text-xl mb-3.5">
                  {feedback.Client.name[2].toUpperCase()}
                </div>
                <h4 className="text-[15px] font-extrabold font-body normal-case tracking-normal mb-0.5">
                  {feedback.Client.name}
                </h4>
                <span className="text-[12px] text-ember font-bold">{feedback.feedback_nps}</span>
                <p className="text-[14px] text-cream/75 mt-3.5 italic">"{feedback.feedback}"</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
