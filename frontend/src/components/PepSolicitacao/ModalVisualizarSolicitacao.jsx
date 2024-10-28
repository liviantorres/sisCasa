import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ContainerAdc = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 40%;
  z-index: 1000;
  position: relative;
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 24px;
  cursor: pointer;
  color: #ffff;
  margin-top: -20px;
  &:hover {
    color: #5a3cae;
  }
`;

const ContainerInputsLabels = styled.div`
  display: flex;
  gap: 80px;
  justify-content: center;
  margin: 20px;
`;

const Div = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Label = styled.h3`
  font-family: "Archivo", sans-serif;
  font-weight: 400;
  margin: 10px 0px;
`;

const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  font-family: "Archivo", sans-serif;
  font-weight: 600;
  width: 30%;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 10px 20px;
  background-color: #8257e5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  margin: 20px;
  &:hover {
    background-color: #372263;
  }
`;

const P = styled.p`
  font-family: "Archivo", sans-serif;
  color: #000000d5;
  font-size: 15px;
  margin: 4px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #774fd1;
  border-radius: 8px 8px 0 0;
`;

const Header = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  letter-spacing: 0.9px;
  font-size: 24px;
  flex: 1;
  text-align: center;
  color: #ffff;
`;

const ModalVisualizarSolicitacao = ({ solicitacao, onClose }) => {
  return (
    <Overlay>
      <ContainerAdc>
        <HeaderContainer>
          <Header>Visualizar Solicitação</Header>
          <CloseIcon onClick={onClose}/>
        </HeaderContainer>
        <ContainerInputsLabels>
          <Div>
            <Label>Título:</Label>
            <P>{solicitacao.titulo}</P>
            <Label>Professor:</Label>
            <P>{solicitacao.professor}</P>
          </Div>
          <Div>
            <Label>Status:</Label>
            <P>{solicitacao.status}</P>
          </Div>
        </ContainerInputsLabels>
        <ContainerBotoes></ContainerBotoes>
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalVisualizarSolicitacao;
