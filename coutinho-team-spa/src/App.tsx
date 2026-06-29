import Navbar from "./components/ui/Navbar";
import Hero from "./components/Hero";
import Sobre from "./components/Sobre";
import Beneficios from "./components/Beneficios";
import Equipe from "./components/Equipe";
import Atletas from "./components/Atletas";
import Planos from "./components/Planos";
import Depoimentos from "./components/Depoimentos";
import CtaFinal from "./components/CtaFinal";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Sobre />
        <Beneficios />
        <Equipe />
        <Atletas />
        <Planos />
        <Depoimentos />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}

export default App;
