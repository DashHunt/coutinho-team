import { Modal } from "../../../shared/ui/Modal";
import { Button } from "../../../shared/ui/Button";
import type { Plan } from "../schemas/planSchema";

type DeletePlanConfirmProps = {
  plan: Plan;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
};

export function DeletePlanConfirm({ plan, onConfirm, onCancel, isDeleting }: DeletePlanConfirmProps) {
  return (
    <Modal
      open
      onClose={onCancel}
      title="Excluir plano"
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
        Tem certeza que deseja excluir o plano <strong>{plan.name}</strong>? Ele pode ser reativado
        depois na aba "Lixeira".
      </p>
    </Modal>
  );
}
