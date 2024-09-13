import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageLayout from "../layouts/PageLayout";

import HomePep from "../pages/HomePep"
import CursosPep from "../pages/CursosPep"
import ProgressoPep from "../pages/ProgressoPep"
import TabelaDePontosPep from "../pages/TabelaDePontosPep"
import NotFound from "../pages/NotFound"
import Home from "../pages/Home";
import Login from "../pages/Login"
import PageLayoutPublic from "../layouts/PageLayoutPublic";
import AdminHome from "../pages/AdminHome";
import Register from "../pages/Register";

const Paths = () => {
    return ( 
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/pep" element={<PageLayout userType = 'pep' />}>
                    <Route index element={<HomePep/>}/>
                    <Route path="/pep/cursos" element={<CursosPep/>}/>
                    <Route path="/pep/progresso" element={<ProgressoPep/>}/>
                    <Route path="/pep/tabela" element={<TabelaDePontosPep/>}/>
                </Route>
                <Route path="/admin" element={<PageLayout userType = 'admin' />}>
                    <Route index element={<AdminHome/>}/>
                    <Route path="/admin/home" element={<CursosPep/>}/>
                    <Route path="/admin/mensagens" element={<ProgressoPep/>}/>
                    <Route path="/admin/adicionar-usuario" element={<TabelaDePontosPep/>}/>
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