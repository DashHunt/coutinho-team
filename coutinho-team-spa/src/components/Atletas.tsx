import { Card } from "./ui/Card";
import { ButtonLink } from "./ui/Button";
import { useGetTopAthletes } from "../queries/ClientQueries";
import { Loader } from "lucide-react";
import coachPhoto from '../assets/arthur-coutinho.jpeg';

interface Athlete {
    medal_count: number,
    id: number,
    name: string,
    email: string,
    birth_date: Date,
    gender: string,
    telephone_number: string,
    document: string,
    objectives: string,
    history: string,
    created_date: Date,
    deleted_date: Date,
    modificated_date: Date,
    clientInfo: {
      id: number,
      client_id: number,
      block: string,
      block_week: string,
      previous_block: string,
      notes: string,
      sheet_link: string,
      created_date: Date,
      deleted_date: Date,
      modificated_date: Date
    },
    clientPlanHistories: [
      {
        id: number,
        client_id: number,
        plan_id: number,
        purchased_date: Date,
        expiration_date: Date,
        status: string,
        created_date: Date,
        modificated_date: Date
      }
    ],
    clientAchiviments: [
      {
        id: number,
        client_id: number,
        event: string,
        event_level: string,
        event_achievement: string,
        event_date: Date,
        created_date: Date,
        deleted_date: Date,
        modificated_date: Date
      }
    ],
    clientFeedbacks: [
      {
        id: number,
        client_id: number,
        feedback: string,
        feedback_nps: string,
        created_date: Date,
        deleted_date: Date,
        modificated_date: Date
      }
    ]
  }

export default function Atletas() {
  const { data, isLoading, isError, error } = useGetTopAthletes();

  return (
    <section id="atletas" className="bg-black py-[90px] border-t border-b border-bone/12">
      <div className="max-w-[1180px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-[60px] items-center">
        <div>
          <p className=" font-body text-[13px] font-bold uppercase tracking-[2.5px] text-ember mb-3">
            Resultados na prática
          </p>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] leading-[1.15] mb-[18px]">
            Conheça alguns dos nossos atletas
          </h2>
          <p className="text-[16px] text-cream/80 max-w-[560px] mb-8">
            Melhor do que falar sobre a equipe, é mostrar resultado. Esses são alguns dos atletas
            que treinam com o Coutinho Team.
          </p>
          <ButtonLink href="#planos" variant="ember" size="lg">
            Quero entrar para o time
          </ButtonLink>
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
          <div className="text-center text-cream/40">Nenhum atleta disponível no momento.</div>
        )}

        <div className=" grid grid-cols-1 sm:grid-cols-3 gap-[18px]">
          {!isLoading && !isError && !!data?.length && data.map((athlete: Athlete) => (
            <Card
              key={athlete.id}
              variant="base"
              rounded="lg"
              padding="none"
              className="p-[22px]"
              hover="lift"
            >
              <div className="w-full h-[140px] rounded-[10px] bg-[linear-gradient(145deg,#232019,#0d0c0a)] flex items-center justify-center font-display text-[30px] text-ember mb-4 border border-bone/12">
                <img src={coachPhoto} alt="" />
              </div>
              <h3 className="text-[16px] mb-2">{athlete.name}</h3>
              <ul className="list-none p-0 m-0 space-y-1">
                {athlete.clientAchiviments.map((achievements) => (
                  <li
                    key={achievements.id}
                    className="text-[13px] text-cream/70 py-1 pl-4 border-l-2 border-ember-deep"
                  >
                    {achievements.event_achievement}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
