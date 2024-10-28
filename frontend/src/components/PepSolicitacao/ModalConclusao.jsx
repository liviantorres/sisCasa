import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineFileUpload } from "react-icons/md";

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
  text-transform: uppercase;
  width: 25%;
  padding: 8px 0px;
  background-color: #1eb662;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: #168e4e;
    transform: translateY(-2px);
    box-shadow: 0px 4px 8px rgba(30, 182, 98, 0.3);
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

const Label = styled.label`
  font-family: "Poppins", sans-serif;
  span {
    color: #ed2c2c;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px;
`;

const Input = styled.input`
  font-family: "Archivo", sans-serif;
  font-weight: 100;
  width: 90%;
  height: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  border-radius: 6px;
  background-color: #f2eeee;

  &:focus {
    border-color: #774fd1;
    outline: none;
    box-shadow: 0 0 2px rgba(119, 79, 209, 0.7);
  }
`;

const FileUploadButton = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-family: "Poppins", sans-serif;
  font-weight: 100;

  width: 30%;
  padding: 8px 0px;
  background-color: #4b3e65;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 0.1em;
  text-align: center;
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #5a4b7a;
    box-shadow: 0px 6px 10px rgba(90, 75, 122, 0.4);
    transform: translateY(-2px);
  }

  input[type="file"] {
    display: none;
  }
`;

const ModalConclusao = ({ onClose }) => {
  return (
    <Overlay>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <HeaderContainer>
          <Header>Solicitação de Conclusão:</Header>
          <CloseIcon onClick={onClose} />
        </HeaderContainer>
        <Div></Div>
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalConclusao;
