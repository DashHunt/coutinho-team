import { Card } from './ui/Card';
import { ButtonLink } from './ui/Button';

interface Athlete {
  initial: string;
  name: string;
  achievements: { label: string }[];
  imageUrl: string;
}

// TODO: Call from an api to get Athletes
const ATHLETES: Athlete[] = [
  {
    initial: 'A',
    name: 'Nome do Atleta',
    achievements: [
      { label: 'Conquista ou título principal' },
      { label: 'Categoria de peso / divisão' },
    ],
    imageUrl: 'skull-thinking.png'
  },
  {
    initial: 'A',
    name: 'Nome do Atleta',
    achievements: [
      { label: 'Conquista ou título principal' },
      { label: 'Categoria de peso / divisão' },
    ],
    imageUrl: 'skull-thinking.png'
  },
  {
    initial: 'A',
    name: 'Nome do Atleta',
    achievements: [
      { label: 'Conquista ou título principal' },
      { label: 'Categoria de peso / divisão' },
    ],
    imageUrl: 'skull-thinking.png'
  },
];

const getImageUrl = (name: string) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};

export default function Atletas() {
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
            Melhor do que falar sobre a equipe, é mostrar resultado. Esses são alguns dos atletas que
            treinam com o Coutinho Team.
          </p>
          <ButtonLink href="#planos" variant="ember" size="lg">
            Quero entrar para o time
          </ButtonLink>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-3 gap-[18px]">
          {ATHLETES.map((a, index) => (
            <Card key={index} variant="base" rounded="lg" padding="none" className="p-[22px]" hover='lift'>
              <div className="w-full h-[140px] rounded-[10px] bg-[linear-gradient(145deg,#232019,#0d0c0a)] flex items-center justify-center font-display text-[30px] text-ember mb-4 border border-bone/12">
                <img src={getImageUrl(a.imageUrl)} alt="" />
              </div>
              <h3 className="text-[16px] mb-2">{a.name}</h3>
              <ul className="list-none p-0 m-0 space-y-1">
                {a.achievements.map((ach, i) => (
                  <li key={i} className="text-[13px] text-cream/70 py-1 pl-4 border-l-2 border-ember-deep">
                    {ach.label}
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
