import { Card } from './ui/Card';

interface Testimonial {
  initial: string;
  name: string;
  tag: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    initial: 'A',
    name: 'Nome do Aluno',
    tag: 'Categoria / Perfil',
    quote:
      'Espaço reservado para o depoimento real deste aluno sobre a experiência treinando com o Coutinho Team.',
  },
  {
    initial: 'A',
    name: 'Nome do Aluno',
    tag: 'Categoria / Perfil',
    quote:
      'Espaço reservado para o depoimento real deste aluno sobre a experiência treinando com o Coutinho Team.',
  },
  {
    initial: 'A',
    name: 'Nome do Aluno',
    tag: 'Categoria / Perfil',
    quote:
      'Espaço reservado para o depoimento real deste aluno sobre a experiência treinando com o Coutinho Team.',
  },
];

export default function Depoimentos() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {TESTIMONIALS.map((t, index) => (
            <Card key={index} variant="elevated" hover="scale" padding="md" rounded="lg">
              <div className="w-12 h-12 rounded-full bg-ember-deep text-bone flex items-center justify-center font-display text-xl mb-3.5">
                {t.initial}
              </div>
              <h4 className="text-[15px] font-extrabold font-body normal-case tracking-normal mb-0.5">
                {t.name}
              </h4>
              <span className="text-[12px] text-ember font-bold">{t.tag}</span>
              <p className="text-[14px] text-cream/75 mt-3.5 italic">{t.quote}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
