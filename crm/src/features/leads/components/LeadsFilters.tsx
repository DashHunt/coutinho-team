import { useEffect, useState } from "react";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { Button } from "../../../shared/ui/Button";
import type { LeadStatus } from "../schemas/leadSchema";

type LeadsFiltersProps = {
  search: string;
  onSearchChange: (search: string) => void;
  status: LeadStatus | "";
  onStatusChange: (status: LeadStatus | "") => void;
  showDeleted: boolean;
  onToggleDeleted: (showDeleted: boolean) => void;
};

export function LeadsFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  showDeleted,
  onToggleDeleted,
}: LeadsFiltersProps) {
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
          label="Buscar por nome ou email"
          value={searchDraft}
          onChange={(event) => setSearchDraft(event.target.value)}
        />
      </div>

      <div className="w-full sm:w-48">
        <Select
          label="Status"
          value={status}
          onChange={(event) => onStatusChange(event.target.value as LeadStatus | "")}
        >
          <option value="">Todos</option>
          <option value="CRIADO">Criado</option>
          <option value="EM_ANDAMENTO">Em andamento</option>
          <option value="CONCLUIDO">Convertido</option>
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
