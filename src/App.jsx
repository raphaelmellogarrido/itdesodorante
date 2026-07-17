import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Produtos from "./pages/Produtos";
import ProdutoDetalhe from "./pages/ProdutoDetalhe";
import Depoimentos from "./pages/Depoimentos";
import Entrar from "./pages/Entrar";
import Registrar from "./pages/Registrar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="produtos" element={<Produtos />} />
            <Route path="produtos/:id" element={<ProdutoDetalhe />} />
            <Route path="depoimentos" element={<Depoimentos />} />
            <Route path="entrar" element={<Entrar />} />
            <Route path="registrar" element={<Registrar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
