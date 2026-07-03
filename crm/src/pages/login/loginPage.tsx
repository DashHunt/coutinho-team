import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginFormSchema, type LoginFormValues } from "../../features/auth/schemas/loginSchema";
import { useLogin } from "../../features/auth/hooks/useLogin";

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
    <form onSubmit={onSubmit}>
      <h1>Coutinho Team CRM</h1>

      <label>
        E-mail
        <input type="email" {...register("email")} />
      </label>
      {errors.email && <span>{errors.email.message}</span>}

      <label>
        Senha
        <input type="password" {...register("password")} />
      </label>
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={login.isPending}>
        Entrar
      </button>

      {login.isError && <span>E-mail ou senha inválidos</span>}
    </form>
  );
}
