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

const Paths = () => {
    return ( 
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/home-pep" element={<PageLayout/>}>
                    <Route index element={<HomePep/>}/>
                    <Route path="/home-pep/cursos-pep" element={<CursosPep/>}/>
                    <Route path="/home-pep/progresso-pep" element={<ProgressoPep/>}/>
                    <Route path="/home-pep/tabela-pep" element={<TabelaDePontosPep/>}/>
                </Route>
                <Route path="/" element={<PageLayoutPublic/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
        </>
     );
}
 
export default Paths;