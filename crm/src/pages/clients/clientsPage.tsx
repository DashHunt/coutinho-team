import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/ui/Button";
import { Pagination } from "../../shared/ui/Pagination";
import { useClients } from "../../features/clients/hooks/useClients";
import { useDeleteClient } from "../../features/clients/hooks/useDeleteClient";
import { useReactivateClient } from "../../features/clients/hooks/useReactivateClient";
import { ClientsFilters } from "../../features/clients/components/ClientsFilters";
import { ClientsTable } from "../../features/clients/components/ClientsTable";
import { ClientFormModal } from "../../features/clients/components/ClientFormModal";
import { DeleteClientConfirm } from "../../features/clients/components/DeleteClientConfirm";
import type { ClientListItem, PlanStatus } from "../../features/clients/schemas/clientSchema";

type ActiveModal = { type: "create" } | { type: "delete"; client: ClientListItem } | null;

export function ClientsPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [planStatus, setPlanStatus] = useState<PlanStatus | "">("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const clientsQuery = useClients({
    page,
    limit: 10,
    search: search || undefined,
    planStatus: planStatus || undefined,
    deleted: showDeleted,
  });
  const deleteClient = useDeleteClient();
  const reactivateClient = useReactivateClient();

  const closeModal = () => setActiveModal(null);

  return (
    <div className="container flex flex-col gap-4 p-6">
      <div className="flex items-center justify-around md:justify-between">
        <h1 className="text-[36px] font-semibold">Clientes</h1>
        <Button onClick={() => setActiveModal({ type: "create" })}>Novo Cliente</Button>
      </div>

      <ClientsFilters
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        planStatus={planStatus}
        onPlanStatusChange={(value) => {
          setPlanStatus(value);
          setPage(1);
        }}
        showDeleted={showDeleted}
        onToggleDeleted={(value) => {
          setShowDeleted(value);
          setPage(1);
        }}
      />

      {clientsQuery.isLoading && <p>Carregando...</p>}

      {clientsQuery.data && (
        <>
          <ClientsTable
            clients={clientsQuery.data.data}
            showDeleted={showDeleted}
            onView={(client) => navigate(`/clients/${client.id}`)}
            onDelete={(client) => setActiveModal({ type: "delete", client })}
            onReactivate={(client) => reactivateClient.mutate(client.id)}
          />
          <Pagination
            page={clientsQuery.data.page}
            totalPages={clientsQuery.data.totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      {activeModal?.type === "create" && <ClientFormModal onClose={closeModal} />}
      {activeModal?.type === "delete" && (
        <DeleteClientConfirm
          client={activeModal.client}
          isDeleting={deleteClient.isPending}
          onCancel={closeModal}
          onConfirm={() => deleteClient.mutate(activeModal.client.id, { onSuccess: closeModal })}
        />
      )}
    </div>
  );
}
