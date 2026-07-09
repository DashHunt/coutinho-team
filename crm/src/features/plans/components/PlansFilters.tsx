import { useEffect, useState } from "react";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { Button } from "../../../shared/ui/Button";
import type { PlanAvailability } from "../schemas/planSchema";

type PlansFiltersProps = {
  search: string;
  onSearchChange: (search: string) => void;
  status: PlanAvailability | "";
  onStatusChange: (status: PlanAvailability | "") => void;
  showDeleted: boolean;
  onToggleDeleted: (showDeleted: boolean) => void;
};

export function PlansFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  showDeleted,
  onToggleDeleted,
}: PlansFiltersProps) {
  const [searchDraft, setSearchDraft] = useState(search);

  useEffect(() => {
    const timeoutId = setTimeout(() => onSearchChange(searchDraft), 400);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDraft]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
      <div className="w-full sm:w-100">
        <Input
          label="Buscar por nome"
          value={searchDraft}
          onChange={(event) => setSearchDraft(event.target.value)}
        />
      </div>

      <div className="w-full sm:w-48">
        <Select
          label="Status"
          value={status}
          onChange={(event) => onStatusChange(event.target.value as PlanAvailability | "")}
        >
          <option value="">Todos</option>
          <option value="ATIVO">Ativo</option>
          <option value="INATIVO">Inativo</option>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="hidden text-sm text-transparent sm:block" aria-hidden="true">
          Ações
        </span>
        <div className="flex gap-2 md:mb-[0.3rem]">
          <Button
            type="button"
            variantTone={showDeleted ? "secondary" : "primary"}
            size="sm"
            className="flex-1 sm:flex-none"
            onClick={() => onToggleDeleted(false)}
          >
            Ativos
          </Button>
          <Button
            type="button"
            variantTone={showDeleted ? "primary" : "secondary"}
            size="sm"
            className="flex-1 sm:flex-none"
            onClick={() => onToggleDeleted(true)}
          >
            Lixeira
          </Button>
        </div>
      </div>
    </div>
  );
}
