import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { loginFormSchema, type LoginFormValues } from "../../features/auth/schemas/loginSchema";
import { useLogin } from "../../features/auth/hooks/useLogin";
import { Input } from "../../shared/ui/Input";
import { Button } from "../../shared/ui/Button";

export function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = handleSubmit((values) => {
    login.mutate(values, { onSuccess: () => navigate("/") });
  });

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-base px-4">
      <div className="pointer-events-none absolute -top-1/4 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-ember/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-ember-deep/20 blur-[100px]" />

      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-bone/10 bg-elevated/70 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-6 flex flex-col items-center gap-4 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ember/30 bg-base/60 shadow-lg shadow-ember/10">
            <Lock className="h-8 w-8 text-ember" />
          </span>
          <div>
            <p className="font-body text-xl font-semibold normal-case text-cream">Entrar</p>
            <p className="mt-1 text-sm text-cream/60">Acesse o CRM da Coutinho Team</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="E-mail"
            errorMessage={errors.email?.message}
            {...register("email")}
          />
          <Input
            type="password"
            placeholder="Senha"
            errorMessage={errors.password?.message}
            {...register("password")}
          />

          <Button type="submit" size="lg" disabled={login.isPending} className="mt-2 w-full">
            {login.isPending ? "Entrando..." : "Entrar"}
          </Button>

          {login.isError && (
            <p className="text-center text-sm text-red-400">E-mail ou senha inválidos</p>
          )}
        </form>
      </div>
    </div>
  );
}
