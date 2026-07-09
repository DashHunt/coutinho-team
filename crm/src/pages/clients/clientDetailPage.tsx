import { useNavigate, useParams } from "react-router-dom";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "../../shared/ui/Badge";
import { useClient } from "../../features/clients/hooks/useClient";
import { ClientGeneralTab } from "../../features/clients/components/ClientGeneralTab";
import { ClientTrainingBlockTab } from "../../features/clients/components/ClientTrainingBlockTab";
import { ClientPlansTab } from "../../features/clients/components/ClientPlansTab";
import { ClientAchievementsTab } from "../../features/clients/components/ClientAchievementsTab";
import { ClientFeedbackTab } from "../../features/clients/components/ClientFeedbackTab";

const TABS = [
  { label: "Geral", panel: ClientGeneralTab },
  { label: "Bloco de Treino", panel: ClientTrainingBlockTab },
  { label: "Planos", panel: ClientPlansTab },
  { label: "Conquistas", panel: ClientAchievementsTab },
  { label: "Feedback", panel: ClientFeedbackTab },
];

export function ClientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const clientQuery = useClient(Number(id));

  if (clientQuery.isLoading) {
    return <p className="p-6">Carregando...</p>;
  }

  if (!clientQuery.data) {
    return <p className="p-6">Cliente não encontrado.</p>;
  }

  const client = clientQuery.data;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate("/clients")}
          className="flex items-center gap-1 text-sm text-cream/60 hover:text-cream"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-semibold">{client.name}</h1>
        {client.deleted_date && <Badge value="Excluído" color="red" />}
      </div>

      <TabGroup>
        <TabList className="flex flex-wrap gap-2 border-b border-bone/15 pb-2">
          {TABS.map((tab) => (
            <Tab
              key={tab.label}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-cream/60 outline-none data-[selected]:bg-ember/15 data-[selected]:text-ember data-[hover]:text-cream"
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="pt-4">
          {TABS.map((tab) => (
            <TabPanel key={tab.label}>
              <tab.panel client={client} />
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
