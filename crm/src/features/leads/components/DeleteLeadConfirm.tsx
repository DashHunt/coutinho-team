import { Modal } from "../../../shared/ui/Modal";
import { Button } from "../../../shared/ui/Button";
import type { Lead } from "../schemas/leadSchema";

type DeleteLeadConfirmProps = {
  lead: Lead;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
};

export function DeleteLeadConfirm({ lead, onConfirm, onCancel, isDeleting }: DeleteLeadConfirmProps) {
  return (
    <Modal
      open
      onClose={onCancel}
      title="Excluir lead"
      footer={
        <div className="flex justify-end gap-2">
          <Button variantTone="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variantTone="danger" onClick={onConfirm} disabled={isDeleting}>
            Excluir
          </Button>
        </div>
      }
    >
      <p>
        Tem certeza que deseja excluir o lead <strong>{lead.name}</strong>? Ele pode ser reativado
        depois na aba "Lixeira".
      </p>
    </Modal>
  );
}
