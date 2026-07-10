import { useState } from "react";
import { Button } from "../../shared/ui/Button";
import { Pagination } from "../../shared/ui/Pagination";
import { useLeads } from "../../features/leads/hooks/useLeads";
import { useDeleteLead } from "../../features/leads/hooks/useDeleteLead";
import { useReactivateLead } from "../../features/leads/hooks/useReactivateLead";
import { LeadsFilters } from "../../features/leads/components/LeadsFilters";
import { LeadsTable } from "../../features/leads/components/LeadsTable";
import { LeadFormModal } from "../../features/leads/components/LeadFormModal";
import { DeleteLeadConfirm } from "../../features/leads/components/DeleteLeadConfirm";
import { ConvertToClientModal } from "../../features/leads/components/ConvertToClientModal";
import type { Lead, LeadStatus } from "../../features/leads/schemas/leadSchema";
import { Container } from "../../shared/ui/Container";
import { ContainerHeader } from "../../shared/ui/ContainerHeader";

type ActiveModal =
  | { type: "create" }
  | { type: "edit"; lead: Lead }
  | { type: "delete"; lead: Lead }
  | { type: "convert"; lead: Lead }
  | null;

export function LeadsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LeadStatus | "">("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const leadsQuery = useLeads({
    page,
    limit: 10,
    search: search || undefined,
    status: status || undefined,
    deleted: showDeleted,
  });
  const deleteLead = useDeleteLead();
  const reactivateLead = useReactivateLead();

  const closeModal = () => setActiveModal(null);

  return (
    <Container>
      <ContainerHeader>
        <h1 className="text-[36px] font-semibold">Leads</h1>
        <Button onClick={() => setActiveModal({ type: "create" })}>Novo Lead</Button>
      </ContainerHeader>

      <LeadsFilters
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        status={status}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        showDeleted={showDeleted}
        onToggleDeleted={(value) => {
          setShowDeleted(value);
          setPage(1);
        }}
      />

      {leadsQuery.isLoading && <p>Carregando...</p>}
      {leadsQuery.data && (
        <div className="mt-2">
          <LeadsTable
            leads={leadsQuery.data.data}
            showDeleted={showDeleted}
            onEdit={(lead) => setActiveModal({ type: "edit", lead })}
            onDelete={(lead) => setActiveModal({ type: "delete", lead })}
            onReactivate={(lead) => reactivateLead.mutate(lead.id)}
            onConvert={(lead) => setActiveModal({ type: "convert", lead })}
          />
          <Pagination
            page={leadsQuery.data.page}
            totalPages={leadsQuery.data.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      {activeModal?.type === "create" && <LeadFormModal onClose={closeModal} />}
      {activeModal?.type === "edit" && (
        <LeadFormModal lead={activeModal.lead} onClose={closeModal} />
      )}
      {activeModal?.type === "convert" && (
        <ConvertToClientModal lead={activeModal.lead} onClose={closeModal} />
      )}
      {activeModal?.type === "delete" && (
        <DeleteLeadConfirm
          lead={activeModal.lead}
          isDeleting={deleteLead.isPending}
          onCancel={closeModal}
          onConfirm={() => deleteLead.mutate(activeModal.lead.id, { onSuccess: closeModal })}
        />
      )}
    </Container>
  );
}
