import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import HomePep from "../pages/pep/HomePep";
import SolicitacoesPep from "../pages/pep/SolicitacoesPep";
import TabelaDePontosPep from "../pages/pep/TabelaDePontosPep";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageLayoutPublic from "../layouts/PageLayoutPublic";
import AdminHome from "../pages/admin/AdminHome";
import Register from "../pages/Register";
import PerfilAdmin from "../pages/admin/PerfilAdmin";
import CursosPep from "../pages/pep/CursosPep";
import SolicitacoesAdmin from "../pages/admin/SolicitacoesAdmin";
import AdcUsuarioAdmin from "../pages/admin/AdcUsuarioAdmin";
import PerfilPep from "../pages/pep/PerfilPep";
import TabelaDePontosAdmin from "../pages/admin/TabelaDePontosAdmin";
import HomeServidor from "../pages/servidor/HomeServidor";
import PerfilServidor from "../pages/servidor/PerfilServidor";
import CursosServidor from "../pages/servidor/CursosServidor";
import SolicitacoesServidor from "../pages/servidor/SolicitacoesServidor";
import { AuthPaths } from "./authPaths";

const Paths = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*Rotas Públicas*/}
        <Route path="/" element={<PageLayoutPublic />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          path="/pep"
          element={
            <AuthPaths>
              <PageLayout userType="pep" />
            </AuthPaths>
          }
        >
          <Route index element={<HomePep />} />
          <Route path="/pep/perfil" element={<PerfilPep />} />
          <Route path="/pep/solicitacoes" element={<SolicitacoesPep />} />
          <Route path="/pep/cursos" element={<CursosPep />} />
          <Route path="/pep/tabela" element={<TabelaDePontosPep />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AuthPaths>
              <PageLayout userType="admin" />
            </AuthPaths>
          }
        >
          <Route
            index
            element={
              <AuthPaths>
                <AdminHome />
              </AuthPaths>
            }
          />
          <Route path="/admin/perfil" element={<PerfilAdmin />} />
          <Route path="/admin/solicitacoes" element={<SolicitacoesAdmin />} />
          <Route path="/admin/usuarios" element={<AdcUsuarioAdmin />} />
          <Route path="/admin/tabela" element={<TabelaDePontosAdmin />} />
        </Route>

        <Route
          path="/servidor"
          element={
            <AuthPaths>
              <PageLayout userType="servidor" />
            </AuthPaths>
          }
        >
          <Route index element={<HomeServidor />} />
          <Route path="/servidor/perfil" element={<PerfilServidor />} />
          <Route path="/servidor/cursos" element={<CursosServidor />} />
          <Route
            path="/servidor/solicitacoes"
            element={<SolicitacoesServidor />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Paths;
