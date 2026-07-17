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
import Entrar from "./pages/Entrar";
import Registrar from "./pages/Registrar";

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
              <Route path="entrar" element={<Entrar />} />
              <Route path="registrar" element={<Registrar />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
