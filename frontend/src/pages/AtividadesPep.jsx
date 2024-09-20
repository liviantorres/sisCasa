import { styled } from "styled-components";
import Header from "../components/Header";
import Atividade from "../components/Atividade";
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

const AtividadesPep = () => {
  return (
    <>
      <Header />
      <ContainerConteudo>
        <Titulo>Seus Atividades</Titulo>

        <Atividade
          titulo="Atividade de Desenvolvimento Web"
          descricao="Este Atividade cobre todos os aspectos do desenvolvimento web moderno, incluindo HTML, CSS, JavaScript e frameworks populares."
          cargaHoraria="40h"
          professor="João Silva"
          botoes={[
            {
              texto: "Inscrever-se",
              onClick: () => alert("Inscrição realizada!"),
            },
            {
              texto: "Mais Informações",
              onClick: () => alert("Mais informações sobre o Atividade."),
            },
          ]}
        />
      </ContainerConteudo>
    </>
  );
};

export default AtividadesPep;
