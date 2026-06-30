import { useForm } from "react-hook-form";
import type { LeadPayload } from "../services/Leads";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/TextArea";
import { useCreateLead } from "../queries/LeadQueries";
import { AlertComponent } from "./ui/Alert";
import { useState } from "react";
import { Loader } from "lucide-react";

type FormFields = Omit<LeadPayload, "planoSelecionado">;

interface LeadFormProps {
  selectedPlan?: string;
}

export default function LeadForm({ selectedPlan }: LeadFormProps) {
  const [openAlert, setOpenAlert] = useState(true);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const { isPending, isError, mutateAsync: createLeads, isSuccess, error } = useCreateLead();

  const onSubmit = async (data: FormFields) => {
    const payload = {
      name: data.name,
      email: data.email,
      telephone_number: data.telephone_number,
      history: data.history,
      selected_plan: selectedPlan,
      status: "created",
    };
    await createLeads(payload);
    setOpenAlert(true);
    setTimeout(() => setOpenAlert(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))} noValidate>
      <h3 className="text-[22px] mb-2.5">Faça seu cadastro</h3>
      <p className="text-[13.5px] text-cream/70 mb-5">
        Vamos dar início à sua jornada no Powerlifting. Preencha os campos abaixo:
      </p>

      <div className="mb-3.5">
        <Input
          {...register("name", { required: "Nome é obrigatório" })}
          type="text"
          placeholder="Seu nome"
          error={errors.name?.message}
        />
      </div>

      <div className="flex gap-3 mb-3.5">
        <div className="flex-1 min-w-0">
          <Input
            {...register("email", {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "E-mail inválido",
              },
            })}
            type="email"
            placeholder="E-mail"
            error={errors.email?.message}
          />
        </div>

        <div className="flex-1 min-w-0">
          <Input
            {...register("telephone_number", { required: "Telefone é obrigatório" })}
            type="tel"
            placeholder="Seu telefone"
            error={errors.telephone_number?.message}
          />
        </div>
      </div>

      <div className="mb-3.5">
        <Textarea {...register("history")} rows={3} placeholder="Conte sobre sua experiência..." />
      </div>

      {isError && (
        <p className="mb-3 text-[13px] text-red-400 text-center">
          Algo deu errado. Por favor, tente novamente. <br />
          {error.message}
        </p>
      )}

      {isSuccess && (
        <AlertComponent open={openAlert}>
          <div>
            <h1 className="ml-1 font-bold text-xl">Solicitação recebida!</h1>
            <p className="font-light mt-1 text-sm">
              Aguarde o contato de nossa equipe para novas informações
            </p>
          </div>
        </AlertComponent>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className={
          "w-full mt-1.5 inline-flex items-center justify-center gap-2 bg-ember text-[#160a05] " +
          "font-extrabold text-[15px] uppercase tracking-[0.5px] rounded-md px-8 py-4 " +
          "border-2 border-ember cursor-pointer transition-all duration-150 " +
          "hover:bg-[#ff7548] hover:shadow-[0_6px_24px_rgba(255,90,46,0.45)] hover:-translate-y-0.5 " +
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
        }
      >
        {isPending ? <Loader className="animate-spin" /> : "Quero entrar para o time"}
      </button>
    </form>
  );
}
