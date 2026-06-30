import { ButtonLink } from "./ui/Button";
import skullAthlete from "../assets/skull-athlete-rock.png";
import logoskull from "../assets/logo-skull-front.png";
import { useGetCountClients, useGetTotalMedals } from "../queries/ClientQueries";

// TODO: bring data from db
export default function Hero() {
  const { data: count, isLoading: loadingCountClients } = useGetCountClients();
  const { data: medals, isLoading: loadingTotalMedals } = useGetTotalMedals();

  return (
    <section
      id="topo"
      className="relative py-[70px] pb-[90px] overflow-hidden border-b border-bone/12"
    >
      {/* Background skull watermark */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[60%] max-w-[700px] opacity-[0.06] pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <img className="hidden md:inline-flex" src={logoskull} alt="" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-[50px] items-center">
        {/* Copy */}
        <div>
          <p className="font-body text-[13px] font-bold uppercase tracking-[2.5px] text-ember mb-3">
            Powerlifting &middot; Força &middot; Competição
          </p>

          <h1 className="font-display text-[clamp(34px,5.2vw,58px)] leading-[1.08] mb-[22px] font-extrabold">
            Treine com quem constrói <span className="text-ember">campeões</span> de verdade.
          </h1>

          <p className="text-[17px] text-cream/80 max-w-[520px] mb-8">
            O Coutinho Team é uma equipe de Powerlifting feita para quem quer evoluir com{" "}
            <strong className="text-cream">método, técnica e acompanhamento de perto</strong> — do
            primeiro treino ao pódio.
          </p>

          <div className="flex flex-wrap gap-4 mb-[50px] max-sm:justify-center  md:flex gap-4 mb-[50px]">
            <ButtonLink href="#planos" variant="ember" size="lg" className="w-75">
              Quero entrar para o time
            </ButtonLink>
            <ButtonLink
              href="#sobre"
              variant="ghost"
              size="lg"
              className="w-75 border-solid border-white"
            >
              Conhecer a equipe
            </ButtonLink>
          </div>

          {loadingCountClients || loadingTotalMedals ? (
            <div>Loading</div>
          ) : (
            <div className="flex flex-wrap gap-9">
              <div key={0} className="flex flex-col">
                <span className="font-display font-extrabold text-[34px] text-ember leading-none">
                  +{medals.total}
                </span>
                <span className="text-[12px] uppercase tracking-[0.5px] text-cream/60 mt-1.5 max-w-[110px]">
                  Medalhas conquistadas
                </span>
              </div>
              <div key={1} className="flex flex-col">
                <span className="font-display font-extrabold text-[34px] text-ember leading-none">
                  +{count.total}
                </span>
                <span className="text-[12px] uppercase tracking-[0.5px] text-cream/60 mt-1.5 max-w-[110px]">
                  Atletas em acompanhamento
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Athlete art */}
        <div className="relative flex justify-center order-first md:order-last">
          <img
            src={skullAthlete}
            alt="Mascote Coutinho Team em uniforme de powerlifting"
            className="relative z-10 max-w-[380px] w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-102"
          />
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none z-0"
            style={{
              background: "radial-gradient(circle, rgba(255, 90, 46, 0.25) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
