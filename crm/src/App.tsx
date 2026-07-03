import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/api/queryClient";
import { AppRouter } from "./shared/router/AppRouter";
import { ToastContainer } from 'react-toastify'
import { useBootstrapAuth } from "./shared/hooks/useBootstrapAuth";

function App() {
  const isBootstrapping = useBootstrapAuth();

  if (isBootstrapping) {
    return <div>Carregando...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ToastContainer position="bottom-right" autoClose={5000} theme="colored" />
    </QueryClientProvider>
  );
}

export default App;
