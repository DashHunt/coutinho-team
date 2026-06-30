import coachPhoto from '../assets/arthur-coutinho.jpeg';

export default function Equipe() {
  return (
    <section id="equipe" className="py-[90px] bg-elevated border-t border-b border-bone/12">
      <div className="max-w-[1180px] mx-auto px-6">

        <div className="text-center max-w-[640px] mx-auto mb-3">
          <p className="font-body text-[30px] font-bold uppercase tracking-[2.5px] text-ember mb-4">
            Bastidores do time
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-[60px] lg:gap-[80px]">

          {/* Foto com corte diagonal na borda direita */}
          <div
            className="w-full md:w-[45%] shrink-0 overflow-hidden shadow rounded"
            style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}
          >
            <img
              src={coachPhoto}
              alt="Arthur Coutinho — Head Coach Coutinho Team"
              className="w-full h-[520px] lg:h-[600px] object-cover"
              style={{objectPosition: 'right bottom'}}
            />
          </div>

          {/* Bio */}
          <div className="flex-1 flex flex-col gap-5">
            <h2 className="font-display text-[clamp(32px,4.5vw,52px)] leading-[1.08]">
              Arthur Coutinho
            </h2>

            <p className="text-[12.5px] font-bold uppercase tracking-[2px] text-ember">
              Head Coach · Powerlifting
            </p>

            <p className="text-[16.5px] text-cream/75 leading-relaxed max-w-[480px]">
              Treinador de Powerlifting com atuação em competições nacionais e estaduais.
              Medalhista pelo Brasil, desenvolve atletas de todas as categorias com foco em
              técnica, periodização e acompanhamento próximo do primeiro treino ao pódio.
            </p>

            <a
              href="https://instagram.com/coutinho_lifts"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-[13px] font-bold text-ember border-b border-ember-deep pb-0.5 mt-1 hover:text-bone transition-colors duration-200"
            >
              IG: @coutinho_lifts
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
