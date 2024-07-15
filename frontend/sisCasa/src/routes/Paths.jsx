import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageLayout from "../layouts/PageLayout";

import HomePep from "../pages/HomePep"
import CursosPep from "../pages/CursosPep"
import ProgressoPep from "../pages/ProgressoPep"
import TabelaDePontosPep from "../pages/TabelaDePontosPep"
import NotFound from "../pages/NotFound"

const Paths = () => {
    return ( 
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageLayout/>}>
                    <Route index element={<HomePep/>}/>
                    <Route path="/cursos" element={<CursosPep/>}/>
                    <Route path="/progresso" element={<ProgressoPep/>}/>
                    <Route path="/tabela" element={<TabelaDePontosPep/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
        </>
     );
}
 
export default Paths;