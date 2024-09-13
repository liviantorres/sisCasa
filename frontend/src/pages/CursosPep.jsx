import { styled } from "styled-components";
import Header from "../components/Header";
import Curso from "../components/Curso";
const ContainerConteudo = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
`;

const Titulo = styled.h2`
  font-family: "Archivo", sans-serif;
  font-weight: 300;
  font-size: 30px;
  color: #202b3b;
  margin-bottom: 40px;
`;

const CursosPep = () => {
  return (
    <>
      <Header />
      <ContainerConteudo>
        <Titulo>Seus Cursos</Titulo>

        <Curso
          titulo="Curso de Desenvolvimento Web"
          descricao="Este curso cobre todos os aspectos do desenvolvimento web moderno, incluindo HTML, CSS, JavaScript e frameworks populares."
          cargaHoraria="40h"
          professor="João Silva"
          botoes={[
            {
              texto: "Inscrever-se",
              onClick: () => alert("Inscrição realizada!"),
            },
            {
              texto: "Mais Informações",
              onClick: () => alert("Mais informações sobre o curso."),
            },
          ]}
        />
      </ContainerConteudo>
    </>
  );
};

export default CursosPep;
