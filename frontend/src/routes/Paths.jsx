import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageLayout from "../layouts/PageLayout";

import HomePep from "../pages/pep/HomePep"
import SolicitacoesPep from "../pages/pep/SolicitacoesPep"
import ProgressoPep from "../pages/pep/ProgressoPep"
import TabelaDePontosPep from "../pages/pep/TabelaDePontosPep"
import NotFound from "../pages/NotFound"
import Home from "../pages/Home";
import Login from "../pages/Login"
import PageLayoutPublic from "../layouts/PageLayoutPublic";
import AdminHome from "../pages/admin/AdminHome";
import Register from "../pages/Register";
import PerfilAdmin from "../pages/admin/PerfilAdmin";
import SolicitacoesAdmin from "../components/AdminSolicitacoes/SolicitacoesAdmin";
import AdcUsuarioAdmin from "../pages/admin/AdcUsuarioAdmin";

const Paths = () => {
    return ( 
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/pep" element={<PageLayout userType = 'pep' />}>
                    <Route index element={<HomePep/>}/>
                    <Route path="/pep/cursos" element={<SolicitacoesPep/>}/>
                    <Route path="/pep/progresso" element={<ProgressoPep/>}/>
                    <Route path="/pep/tabela" element={<TabelaDePontosPep/>}/>
                </Route>
                <Route path="/admin" element={<PageLayout userType = 'admin' />}>
                    <Route index element={<AdminHome/>}/>
                    <Route path="/admin/perfil" element={<PerfilAdmin/>}/>
                    <Route path="/admin/solicitacoes" element={<SolicitacoesAdmin/>}/>
                    <Route path="/admin/usuarios" element={<AdcUsuarioAdmin/>}/>
                </Route>
                <Route path="/" element={<PageLayoutPublic/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                </Route>

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
        </>
     );
}
 
export default Paths;