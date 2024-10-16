import { styled } from "styled-components";
import Header from "../../components/Header";
import Atividade from "../../components/Atividade";


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
            <Atividade
          titulo="Atividade de Desenvolvimento Web"
          descricao="Este curso cobre todos os aspectos do desenvolvimento web moderno, incluindo HTML, CSS, JavaScript e frameworks populares."
          cargaHoraria="40h"
          professor="João Silva"
          botoes={[
            {
              texto: "Inscrever-se",
              onClick: () => alert("Inscrição realizada!"),
              cor: '#04D361'
            },
          ]}
        />
        </ContainerConteudo>
        </>
     );
}
 
export default HomePep;