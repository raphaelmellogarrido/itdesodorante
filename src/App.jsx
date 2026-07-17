import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Produtos from "./pages/Produtos";
import ProdutoDetalhe from "./pages/ProdutoDetalhe";
import Carrinho from "./pages/Carrinho";
import Perfil from "./pages/Perfil";
import MeusPedidos from "./pages/MeusPedidos";
import PedidoConfirmado from "./pages/PedidoConfirmado";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosDeUso from "./pages/TermosDeUso";
import Entrar from "./pages/Entrar";
import Registrar from "./pages/Registrar";
import EsqueciSenha from "./pages/EsqueciSenha";
import RedefinirSenha from "./pages/RedefinirSenha";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="sobre" element={<Sobre />} />
              <Route path="produtos" element={<Produtos />} />
              <Route path="produtos/:id" element={<ProdutoDetalhe />} />
              <Route path="carrinho" element={<Carrinho />} />
              <Route path="perfil" element={<Perfil />} />
              <Route path="meus-pedidos" element={<MeusPedidos />} />
              <Route path="pedido-confirmado/:id" element={<PedidoConfirmado />} />
              <Route path="politica-de-privacidade" element={<PoliticaPrivacidade />} />
              <Route path="termos-de-uso" element={<TermosDeUso />} />
              <Route path="entrar" element={<Entrar />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="esqueci-senha" element={<EsqueciSenha />} />
              <Route path="redefinir-senha" element={<RedefinirSenha />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
