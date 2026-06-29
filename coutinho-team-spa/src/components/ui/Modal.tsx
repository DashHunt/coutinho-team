import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Formulário de cadastro"
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-elevated border border-bone/12 rounded-[14px] max-w-[460px] w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-3.5 right-4 bg-transparent border-none text-cream text-[26px] cursor-pointer leading-none hover:text-ember transition-colors duration-150 p-0"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
