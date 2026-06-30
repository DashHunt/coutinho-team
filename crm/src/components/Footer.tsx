import badgeLogo from '../assets/badge-logo-final.png';

const SOCIAL_LINKS = [
  { label: 'Instagram', short: 'IG', href: '#' },
  { label: 'WhatsApp', short: 'WA', href: '#' },
  { label: 'E-mail', short: '@', href: '#' },
] as const;

export default function Footer() {
  return (
    <footer className="bg-base pt-[70px] border-t border-bone/12">
      <div className="max-w-[1180px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 pb-[50px]">
        {/* Brand */}
        <div>
          <img
            src={badgeLogo}
            alt="Coutinho Team Powerlifting"
            className="w-14 h-14 mb-3.5 rounded-full object-contain"
          />
          <p className="font-display text-sm uppercase tracking-[0.5px] mb-4">
            Coutinho Team Powerlifting
          </p>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map(({ label, short, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full border border-bone/12 flex items-center justify-center text-[11px] font-extrabold transition-colors duration-150 hover:border-ember hover:text-ember"
              >
                {short}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[16px] mb-3.5">Fale conosco</h4>
          <p className="text-[14px] text-cream/75 mb-2">WhatsApp: (00) 00000-0000</p>
          <p className="text-[14px] text-cream/75 mb-4">contato@coutinhoteam.com.br</p>
          <a href="#" className="text-[13px] text-ember underline">
            Política de Privacidade
          </a>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-6">
        <hr className="border-bone/12 mb-5" />
        <p className="text-[13px] text-cream/45 pb-6">
          &copy; 2026 Coutinho Team Powerlifting
        </p>
      </div>
    </footer>
  );
}
