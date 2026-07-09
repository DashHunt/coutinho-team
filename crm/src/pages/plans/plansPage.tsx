import { useState } from "react";
import { Button } from "../../shared/ui/Button";
import { Pagination } from "../../shared/ui/Pagination";
import { usePlans } from "../../features/plans/hooks/usePlans";
import { useDeletePlan } from "../../features/plans/hooks/useDeletePlan";
import { useReactivatePlan } from "../../features/plans/hooks/useReactivatePlan";
import { PlansFilters } from "../../features/plans/components/PlansFilters";
import { PlansTable } from "../../features/plans/components/PlansTable";
import { PlanFormModal } from "../../features/plans/components/PlanFormModal";
import { DeletePlanConfirm } from "../../features/plans/components/DeletePlanConfirm";
import type { Plan, PlanAvailability } from "../../features/plans/schemas/planSchema";

type ActiveModal =
  | { type: "create" }
  | { type: "edit"; plan: Plan }
  | { type: "delete"; plan: Plan }
  | null;

export function PlansPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PlanAvailability | "">("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const plansQuery = usePlans({
    page,
    limit: 10,
    search: search || undefined,
    status: status || undefined,
    deleted: showDeleted,
  });
  const deletePlan = useDeletePlan();
  const reactivatePlan = useReactivatePlan();

  const closeModal = () => setActiveModal(null);

  return (
    <div className="container flex flex-col gap-4 py-4 sm:gap-6 mx-auto">
      <div className="flex items-center justify-around md:justify-between">
        <h1 className="text-[36px] font-semibold ml-4">Planos</h1>
        <Button onClick={() => setActiveModal({ type: "create" })}>Novo Plano</Button>
      </div>

      <div className="flex justify-center items-center">
        <PlansFilters
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
      </div>

      {plansQuery.isLoading && <p>Carregando...</p>}
      {plansQuery.data && (
        <>
          <PlansTable
            plans={plansQuery.data.data}
            showDeleted={showDeleted}
            onEdit={(plan) => setActiveModal({ type: "edit", plan })}
            onDelete={(plan) => setActiveModal({ type: "delete", plan })}
            onReactivate={(plan) => reactivatePlan.mutate(plan.id)}
          />
          <Pagination
            page={plansQuery.data.page}
            totalPages={plansQuery.data.totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      {activeModal?.type === "create" && <PlanFormModal onClose={closeModal} />}
      {activeModal?.type === "edit" && (
        <PlanFormModal plan={activeModal.plan} onClose={closeModal} />
      )}
      {activeModal?.type === "delete" && (
        <DeletePlanConfirm
          plan={activeModal.plan}
          isDeleting={deletePlan.isPending}
          onCancel={closeModal}
          onConfirm={() => deletePlan.mutate(activeModal.plan.id, { onSuccess: closeModal })}
        />
      )}
    </div>
  );
}
