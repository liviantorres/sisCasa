import Header from "../Header";
import styled from "styled-components";
import Solicitacao from "./Solicitacao";

const Titulo = styled.h2`
  font-family: "Archivo", sans-serif;
  font-weight: 300;
  font-size: 30px;
  color: #202b3b;
  margin-bottom: 40px;
`;

const ContainerConteudo = styled.div`
    margin: 50px;
    display: flex;
    flex-direction: column;
  `;


const ScrollableAtividades = styled.div`
max-height: 500px;
overflow-y: auto;
padding-right: 20px;
`;

const SolicitacoesAdmin = () => {
    const exemploSolicitacao = {
        titulo: "Aprendizado de React",
        professor: "Prof. João Silva",
        data: "23/09/2024",
        status: "aceito"
    };
  return (
    <>
      <Header />
      <ContainerConteudo>
        <Titulo>Solicitações Recebidas</Titulo>
        <ScrollableAtividades>
         <Solicitacao solicitacao={exemploSolicitacao}/>
         <Solicitacao solicitacao={exemploSolicitacao}/>
         <Solicitacao solicitacao={exemploSolicitacao}/>
         <Solicitacao solicitacao={exemploSolicitacao}/>
        </ScrollableAtividades>
      </ContainerConteudo>
    </>
  );
};

export default SolicitacoesAdmin;
