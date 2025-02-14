import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai"; 
import { useEffect, useState } from "react";
import axios from "axios";

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
  font-family: 'Archivo', sans-serif;
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

const ModalVisualizar = ({ onClose, modalFrequencia, modalAprovacao, atividade, eProfessor }) => {
  const [professor, setProfessor] = useState({});

  const handleOpenModalFrequencia = () => {
    modalFrequencia(atividade);
  };

  const handleOpenModal = () => {
    modalAprovacao(atividade);
  };

  const fetchProfessor = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://200.129.40.161:3000/user/${atividade.professorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("prof", response.data);
      setProfessor(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (atividade && atividade.professorId) {
      fetchProfessor();
    }
  }, [atividade]);

  return (
    <Overlay onClick={onClose}>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <HeaderContainer>
          <Header>VISUALIZAR ATIVIDADE</Header>
          <CloseIcon onClick={onClose} />
        </HeaderContainer>
        <ContainerInputsLabels>
          <Div>
            <Label>Título:</Label>
            <P>{atividade.titulo}</P>
            <Label>Descrição:</Label>
            <P>{atividade.descricao}</P>
          </Div>
          <Div>
            {atividade.categoria !== "edital" && (
              <>
                <Label>Professor:</Label>
                <P>{professor?.nomeCompleto || "Carregando..."}</P>
                <Label>Carga Horária:</Label>
                <P>{atividade.cargaHoraria}h</P>
              </>
            )}
            <Label>Link:</Label>
            <P>{atividade.link}</P>
          </Div>
        </ContainerInputsLabels>
        {atividade.categoria === "curso" && eProfessor && ( 
          <ContainerBotoes>
            <Button onClick={handleOpenModalFrequencia}>Frequência</Button>
            <Button onClick={handleOpenModal}>Aprovação</Button>
          </ContainerBotoes>
        )}
      </ContainerAdc>
    </Overlay>
  );
};


export default ModalVisualizar;
