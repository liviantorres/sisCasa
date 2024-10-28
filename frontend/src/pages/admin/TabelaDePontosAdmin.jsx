import { styled } from "styled-components";
import Header from "../../components/Header";


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

const ScrollableAtividades = styled.div`
  max-height: 500px;
  overflow-y: auto;
  padding-right: 20px;
`;



const TabelaDePontosAdmin = () => {

  return (
    <>
      <Header />
      <ContainerConteudo>
        <Titulo>Tabela de Pontos Admin</Titulo>

        <ScrollableAtividades>
         
        </ScrollableAtividades>
      </ContainerConteudo>
    </>
  );
};

export default TabelaDePontosAdmin;

