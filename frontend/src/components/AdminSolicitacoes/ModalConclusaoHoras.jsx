
import styled from "styled-components";

import { AiOutlineClose } from "react-icons/ai";
import { darken } from "polished";

import "./style.css";

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
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 50%;
  z-index: 1000;
`;

const CloseIcon = styled(AiOutlineClose)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
  &:hover {
    color: #5a3cae;
  }
`;

const ContainerInputsLabels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
  background-color: #f5f5f9;
  border-radius: 8px;
  padding: 20px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: "Poppins", sans-serif;
  font-weight: 550;
  text-transform: uppercase;

  color: #774fd1;
  margin: 12px 0px 12px 0px;
`;

const TextArea = styled.textarea`
  font-family: "Archivo", sans-serif;
  font-weight: 400;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px;
  resize: vertical;
  min-height: 80px;

  &:focus {
    border-color: #774fd1;
    outline: none;
    box-shadow: 0 0 4px rgba(119, 79, 209, 0.7);
  }
`;

const Button = styled.button`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  width: 25%;
  padding: 8px 0px;

  background-color: ${({ cor }) => cor || "#1eb662"};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: ${({ cor }) => (cor ? darken(0.1, cor) : "#1eb662")};
    transform: translateY(-2px);
    box-shadow: 0px 4px 8px rgba(30, 182, 98, 0.3);
  }
`;

const ContainerBotoes = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Header = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 20px;
  text-align: center;
  color: #ffffff;
  background-color: #774fd1;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  text-transform: uppercase;
`;

const ContainerStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ status }) => {
    switch (status) {
      case "Pendente":
        return "yellow";
      case "Rejeitado":
        return "red";
      case "Aceito":
        return "green";
      default:
        return "gray";
    }
  }};
`;

const DivTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 100px;
`;

const P = styled.p`
  font-family: "Archivo", sans-serif;
  margin-left: 5px;
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

const ModalConclusaoHoras = ({solicitacao, onClose}) => {

    const formatarData = (dataISO) => {
        const dataObj = new Date(dataISO);
        const opcoes = { day: "2-digit", month: "numeric", year: "numeric" };
        return dataObj.toLocaleDateString("pt-BR", opcoes);
      };

    return (
        <Overlay>
      <ContainerAdc>
        <Header>Detalhes da Solicitação</Header>
        <CloseIcon onClick={onClose} />
        <ContainerInputsLabels>
          <DivTop>
            <Div>
              <Label>Tipo de Solicitação:</Label>
           
              <Label>Descrição:</Label>
            
            </Div>
            <Div>
              <Label>Curso:</Label>
              <P></P>
              <Label>Status:</Label>
              <ContainerStatus>
               
              </ContainerStatus>
            </Div>
            <Div>
              <Label>Remetente:</Label>
              <P></P>
              <Label>Data:</Label>
            
            </Div>
          </DivTop>
          <Div>
            <Label>Motivo (se rejeitado):</Label>
            <TextArea
              placeholder="Explique o motivo da rejeição (opcional)"
            
              
            />
            <Label>Certificado em PDF:</Label>

            <FileUploadButton>
              <MdOutlineFileUpload size={25} />
              Escolher Arquivo
              <input type="file" />
            </FileUploadButton>
          </Div>
        </ContainerInputsLabels>
        <ContainerBotoes>
          <Button cor="#4caf50" >
            Aceitar
          </Button>
          <Button cor="#C02929">
            Rejeitar
          </Button>
        </ContainerBotoes>
      </ContainerAdc>
    </Overlay>
      );
}
 
export default ModalConclusaoHoras;