import { Modal } from "../../../shared/ui/Modal";
import { Button } from "../../../shared/ui/Button";
import type { ClientListItem } from "../schemas/clientSchema";

type DeleteClientConfirmProps = {
  client: ClientListItem;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
};

export function DeleteClientConfirm({ client, onConfirm, onCancel, isDeleting }: DeleteClientConfirmProps) {
  return (
    <Modal
      open
      onClose={onCancel}
      title="Excluir cliente"
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
        Tem certeza que deseja excluir o cliente <strong>{client.name}</strong>? Ele pode ser
        reativado depois na aba "Lixeira".
      </p>
    </Modal>
  );
}
