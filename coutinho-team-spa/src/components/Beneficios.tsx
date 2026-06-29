import { Card } from './ui/Card';

const BENEFITS = [
  {
    icon: '📋',
    title: 'Check-in semanal',
    description:
      'Feedback constante sobre treino, recuperação e fadiga, com ajustes personalizados pra manter seu progresso constante.',
  },
  {
    icon: '🏆',
    title: 'Auxílio em campeonatos',
    description:
      'Suporte e orientação completa nas competições, do peso até a estratégia das tentativas na plataforma.',
  },
  {
    icon: '📈',
    title: 'Acompanhamento diário',
    description:
      'Planilha de treino atualizada periodicamente de acordo com a sua resposta ao treinamento.',
  },
  {
    icon: '🎥',
    title: 'Análise de vídeo',
    description:
      'Correções técnicas e dicas de execução pra você levantar mais pesado com mais segurança.',
  },
  {
    icon: '💬',
    title: 'Comunidade exclusiva',
    description:
      'Acesso ao grupo do time, com troca direta entre atletas, dúvidas e motivação todos os dias.',
  },
  {
    icon: '🦴',
    title: 'Material de apoio',
    description:
      'Primeira chamada com seu treinador pra montar o planejamento e entender seus objetivos a fundo.',
  },
] as const;

export default function Beneficios() {
  return (
    <section id="beneficios" className="py-[90px] bg-elevated border-t border-b border-bone/12">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <p className="font-body text-[13px] font-bold uppercase tracking-[2.5px] text-ember mb-3">
            O que você recebe
          </p>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] leading-[1.15]">
            Benefícios de treinar com o time
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {BENEFITS.map((b) => (
            <Card key={b.title} variant="base" hover="lift" padding="lg" rounded="lg" className="hover:border-ember-deep">
              <div className="text-[30px] mb-4">{b.icon}</div>
              <h3 className="text-[18px] mb-2.5 tracking-[0.3px]">{b.title}</h3>
              <p className="text-[14.5px] text-cream/70 m-0">{b.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
