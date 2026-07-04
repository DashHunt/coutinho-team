import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} transition className="relative z-50">
      <div
        className="fixed inset-0 bg-base/80 backdrop-blur-sm transition duration-200 data-[closed]:opacity-0"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-3xl border border-bone/10 bg-elevated/95 p-6 shadow-2xl backdrop-blur-xl transition duration-200 data-[closed]:scale-95 data-[closed]:opacity-0">
          <DialogTitle className="text-lg font-semibold text-cream">{title}</DialogTitle>
          <div className="mt-4 max-h-[60vh] overflow-y-auto text-cream/90">{children}</div>
          {footer && <div className="mt-6">{footer}</div>}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
