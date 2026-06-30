import { useState } from 'react';
import { ButtonLink } from './Button';
import badgeLogo from '../../assets/badge-logo-final.png';

const NAV_LINKS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Equipe', href: '#equipe' },
  { label: 'Atletas', href: '#atletas' },
  { label: 'Planos', href: '#planos' },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-base/85 backdrop-blur-md border-b border-bone/12">
      <nav className="max-w-[1180px] mx-auto px-6 flex items-center justify-between py-3.5 gap-5">
        <a href="#topo" className="flex items-center gap-2.5 shrink-0 transition-transform duration-300 hover:scale-110">
          <img
            src={badgeLogo}
            alt="Coutinho Team Powerlifting"
            className="w-11 h-11 object-contain rounded-full"
          />
          <span className="font-display text-[22px] tracking-tighter text-cream font-bold">
            COUTINHO<span className="text-ember ml-1">TEAM</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-7 flex-1 justify-center list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[14px] font-bold uppercase tracking-[0.5px] text-cream hover:text-ember transition-colors duration-150"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:inline-flex shrink-0">
          <ButtonLink
            href="#planos"
            variant="ember"
            className="w-full font-semibold text-white"
          >
            Comece agora
          </ButtonLink>
        </div>

        {/* Mobile hamburger toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          className="md:hidden flex items-center justify-center w-9 h-9 bg-transparent border-none cursor-pointer shrink-0 p-0 text-cream"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden bg-elevated border-b border-bone/12 px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-[14px] font-bold uppercase tracking-[0.5px] text-cream hover:text-ember transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
          <ButtonLink
            href="#planos"
            variant="ember"
            className="mt-2 w-full justify-center"
            onClick={() => setIsOpen(false)}
          >
            Comece agora
          </ButtonLink>
        </div>
      )}
    </header>
  );
}
