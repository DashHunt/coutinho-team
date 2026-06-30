import { Card } from './ui/Card';

interface TeamMember {
  initials: string;
  name: string;
  role: string;
  bio: string;
  instagram: string;
  instagramHref?: string;
}

const TEAM: TeamMember[] = [
  {
    initials: 'CT',
    name: 'Nome do Treinador',
    role: 'Head Coach · Powerlifting',
    bio: 'Substitua por uma breve descrição da experiência, títulos e especialidade deste treinador.',
    instagram: '@usuario',
  },
  {
    initials: 'CT',
    name: 'Nome do Treinador',
    role: 'Treinador · Especialista Jr/Sub-jr',
    bio: 'Substitua por uma breve descrição da experiência, títulos e especialidade deste treinador.',
    instagram: '@usuario',
  },
  {
    initials: 'CT',
    name: 'Nome do Treinador',
    role: 'Treinador · Reabilitação',
    bio: 'Substitua por uma breve descrição da experiência, títulos e especialidade deste treinador.',
    instagram: '@usuario',
  },
  {
    initials: 'CT',
    name: 'Nome do Treinador',
    role: 'Treinador · Performance',
    bio: 'Substitua por uma breve descrição da experiência, títulos e especialidade deste treinador.',
    instagram: '@usuario',
  },
];

export default function Equipe() {
  return (
    <section id="equipe" className="py-[90px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <p className="font-body text-[13px] font-bold uppercase tracking-[2.5px] text-ember mb-3">
            Bastidores do time
          </p>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] leading-[1.15]">
            Nossa equipe de treinadores
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
          {TEAM.map((m, index) => (
            <Card key={index} variant="elevated" hover="scale" padding="none" rounded="lg" className="px-[22px] py-[26px] text-center">
              <div className="w-[84px] h-[84px] mx-auto mb-4 rounded-full bg-[linear-gradient(145deg,var(--color-ember-deep),#3a160d)] flex items-center justify-center font-display text-[22px] text-bone border-2 border-ember">
                {m.initials}
              </div>
              <h3 className="text-[16px] mb-1 tracking-[0.3px]">{m.name}</h3>
              <p className="text-[12px] text-ember uppercase tracking-[0.4px] mb-3">{m.role}</p>
              <p className="text-[13.5px] text-cream/70 mb-3.5">{m.bio}</p>
              <a href={m.instagramHref ?? '#'} className="text-[12.5px] font-bold text-ember border-b border-ember-deep pb-0.5">
                IG: {m.instagram}
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
