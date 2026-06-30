import { Card } from './ui/Card';
import skullThinking from '../assets/skull-thinking.png';

const STATS = [
  { value: '+00', label: 'Medalhas nacionais' },
  { value: '+00', label: 'Medalhas estaduais' },
] as const;

export default function Sobre() {
  return (
    <section id="sobre" className="py-[90px]">
      <div className="max-w-[1180px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
        <div>
          <p className="font-body text-[16px] font-bold uppercase tracking-[2px] text-ember mb-3">
            Quem somos
          </p>
          <h2 className="font-display text-[40px] leading-[1.15] mb-[18px] font-bold tracking-tighter">
            A filosofia do Coutinho Team
          </h2>
          <p className="text-[16px] text-cream/80 max-w-[560px] mb-[18px]">
            O <strong className="text-cream">Coutinho Team Powerlifting</strong> nasceu da experiência de
            competir, errar, ajustar e evoluir — dentro e fora da plataforma. Trabalhamos com{' '}
            <strong className="text-cream">treinamento de força e Powerlifting</strong> para atletas de
            competição e para quem busca o esporte como estilo de vida, sempre com técnica sólida,
            progressão inteligente e acompanhamento de verdade.
          </p>
          <p className="text-[16px] text-cream/80 max-w-[560px] mb-9">
            Acreditamos que força se constrói com consistência, não com atalhos. Por isso cada aluno
            recebe um plano de treino pensado pra sua realidade, com ajustes constantes baseados em como
            o corpo responde.
          </p>

          <div className="flex gap-4 mt-9">
            {STATS.map((s) => (
              <Card key={s.label} variant="elevated" padding="sm" rounded="md" className="transition-transform duration-300 hover:scale-110 min-w-[120px]">
                <span className="block font-display font-extrabold text-[30px] text-ember leading-none">{s.value}</span>
                <span className="block text-[12px] text-cream/65 uppercase tracking-[0.4px] mt-1.5">{s.label}</span>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={skullThinking}
            alt=""
            aria-hidden="true"
            className="max-w-[320px] drop-shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </section>
  );
}
