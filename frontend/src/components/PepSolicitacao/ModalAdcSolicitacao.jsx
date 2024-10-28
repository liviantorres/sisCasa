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
  width: 50%;
  z-index: 1000;
  position: relative;
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 24px;
  cursor: pointer;
  color: #000;
  margin-top: -20px;
  &:hover {
    color: #5a3cae;
  }
`;

const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  width: 40%;
  padding: 12px 24px;
  background-color: #774fd1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  margin: 20px;

  &:hover {
    background-color: #6536a4;
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  border-radius: 8px 8px 0 0;
`;

const Header = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  letter-spacing: 0.9px;
  font-size: 20px;
  flex: 1;
  text-align: center;
  color: #000;
`;

const ModalAdcSolicitacao = ({onClose, modalAtividade, modalContabilizar, modalConclusao}) => {
  return (
    <Overlay>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <HeaderContainer>
          <Header>Selecione o tipo de solicitação:</Header>
          <CloseIcon onClick={onClose}/>
        </HeaderContainer>

        <ContainerBotoes>
          <Button onClick={modalAtividade}>Atividade</Button>
          <Button onClick={modalContabilizar}>Contabilizar Hora</Button>
          <Button onClick={modalConclusao}>Conclusão</Button>
        </ContainerBotoes>
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalAdcSolicitacao;
