import styled from 'styled-components';
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
  color: #fff;
  margin-top: -20px;
  &:hover {
    color: #5a3cae;
  }
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
  color: #fff;
  letter-spacing: 0.9px;
  font-size: 20px;
  flex: 1;
  text-align: center;
`;

const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;


const ButtonCancel = styled.button`
 font-family: 'Poppins', sans-serif;
 font-weight: 600;
  padding: 10px;
  margin: 10px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  background-color: #ccc; 
  color: #000;
  border-radius: 5px;

  &:hover {
    color: #fff;
    transform: scale(1.1);
  }
`;

const ButtonConfirm = styled.button`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  padding: 10px;
  margin: 10px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  background-color: #6d4abc; 
  color: #000000;
  border-radius: 5px;

  &:hover {
    color: #fff;
    transform: scale(1.1);
  }
`;

const TabelaDePontos = ({ onClose, onConfirm, onFileChange, file }) => {
  return (
    <Overlay>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <HeaderContainer>
          <Header>Confirmar Upload de Arquivo CSV</Header>
          <CloseIcon onClick={onClose} />
        </HeaderContainer>
        <div style={{ margin: "40px" }}>
          <label style={{ fontFamily: "Poppins", fontSize: "16px" }}>
            Selecione um arquivo CSV
          </label>
          <input type="file" accept=".csv" onChange={onFileChange} style={{ width: "90%", marginTop: "10px", marginBottom: "20px" }} />
          {file && <p>Arquivo selecionado: {file.name}</p>}
        </div>

        <ContainerBotoes>
          <ButtonCancel onClick={onClose}>Cancelar</ButtonCancel>
          <ButtonConfirm onClick={onConfirm}>Confirmar</ButtonConfirm>
        </ContainerBotoes>
    
      </ContainerAdc>
    </Overlay>
  );
};

export default TabelaDePontos;
