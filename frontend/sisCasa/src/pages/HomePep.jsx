import { styled } from "styled-components";
import Header from "../components/Header";
import Curso from "../components/Curso";


const HomePep = () => {
    const ContainerConteudo = styled.div`
        margin: 50px;
        display: flex;
        flex-direction: column;
    `;

    const Titulo = styled.h2`
        font-family: 'Archivo', sans-serif;
        font-weight: 300;
        font-size: 30px;
        color: #202B3B;
        margin-bottom: 40px;
    `;

    return ( 
        <>
        <Header/>
        <ContainerConteudo>
            <Titulo>Cursos Disponíveis </Titulo>
            <Curso/>
            <Curso/>
        </ContainerConteudo>
        </>
     );
}
 
export default HomePep;