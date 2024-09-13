import { styled } from "styled-components";
import Header from "../components/Header";
import Curso from "../components/Curso";

const AdminHome = () => {
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

  return (
    <>
      <Header />
      <ContainerConteudo>
        <Titulo>Cursos Adicionados</Titulo>
        <Curso
          titulo="Curso de Desenvolvimento Web"
          descricao="Este curso cobre todos os aspectos do desenvolvimento web moderno, incluindo HTML, CSS, JavaScript e frameworks populares."
          cargaHoraria="40h"
          botoes={[
            {
              texto: "Editar",
              onClick: () => alert("Inscrição realizada!"),
              cor: '#928AA2'
            },
            {
              texto: "Remover",
              onClick: () => alert("Inscrição realizada!"),
              cor: '#4B3E65'
            },
          ]}
        />
      </ContainerConteudo>
    </>
  );
};

export default AdminHome;
