import { ButtonLink } from './ui/Button';
import skullCross from '../assets/skull-athlete-cross.png';

export default function CtaFinal() {
  return (
    <section
      className="py-[80px]"
      style={{ background: 'linear-gradient(170deg, #b8311a -10%, #2a0f08 30%, #0b0b0b 100%)' }}
    >
      <div className="max-w-[1180px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] items-center gap-10">
        <div>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] leading-[1.15] mb-[18px]">
            Pronto pra ficar mais forte?
          </h2>
          <p className="text-[16px] text-cream/85 max-w-[560px] mb-8">
            Reserve sua vaga e comece sua jornada no Powerlifting com acompanhamento de verdade.
          </p>
          <ButtonLink href="#planos" variant="ember" size="lg">
            Quero entrar para o time
          </ButtonLink>
        </div>

        <img
          src={skullCross}
          alt=""
          aria-hidden="true"
          className="max-w-[260px] mx-auto drop-shadow-[0_16px_40px_rgba(0,0,0,0.5)] order-first md:order-last transition-transform duration-300 hover:scale-102"
        />
      </div>
    </section>
  );
}
