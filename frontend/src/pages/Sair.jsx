import styled from "styled-components";
import { IoClose } from "react-icons/io5";



const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  font-family: 'Poppins', sans-serif;
`;

const CloseIcon = styled(IoClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #6d4abc;
  cursor: pointer;
  &:hover {
    color: #de2d41;
  }
`;

const ButtonCancel = styled.button`
 font-family: 'Poppins', sans-serif;
  padding: 10px;
  margin: 10px;
  border: none;
  cursor: pointer;
  background-color: #ccc; 
  color: #fff;
  border-radius: 5px;

  &:hover {
    color: #000;
    transform: scale(1.1);
  }
`;

const ButtonConfirm = styled.button`
font-family: 'Poppins', sans-serif;
  padding: 10px;
  margin: 10px;
  border: none;
  cursor: pointer;
  background-color: #6d4abc; 
  color: #fff;
  border-radius: 5px;

  &:hover {
    color: #000;
    transform: scale(1.1);
  }
`;

const Sair = ({ onCancel, onConfirm }) => {
  return (
    <>
    
      <ModalOverlay>
        <ModalContainer>
          <CloseIcon onClick={onCancel} />
          <h3>Tem certeza que deseja sair?</h3>
          <div>
            <ButtonCancel onClick={onCancel}>Cancelar</ButtonCancel>
            <ButtonConfirm onClick={onConfirm}>Confirmar</ButtonConfirm>
          </div>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
};

export default Sair;
