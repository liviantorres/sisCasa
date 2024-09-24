import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types"; 

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
  margin: 4px;
`;

const Input = styled.input`
  font-family: "Archivo", sans-serif;
  font-weight: 100;
  color: #0000008a;
  border: 1px solid #ccc;
  width: 100%;
  height: 30px;
  padding-left: 4px;
  border-radius: 6px;
  margin-bottom: 8px;

  &::placeholder {
    color: #999;
    font-family: "Archivo", sans-serif;
    font-weight: 100;
    font-size: 13px;
  }

  &:focus {
    border-color: #774fd1;
    outline: none;
    box-shadow: 0 0 2px rgba(119, 79, 209, 0.7);
  }
`;

const Select = styled.select`
  font-family: "Archivo", sans-serif;
  font-weight: 100;
  color: #0000008a;
  border: 1px solid #ccc;
  width: 100%;
  height: 30px;
  padding-left: 4px;
  margin-bottom: 8px;
  border-radius: 6px;
  &::placeholder {
    color: #999;
    font-family: "Archivo", sans-serif;
    font-weight: 100;
    font-size: 13px;
  }
  &:focus {
    border-color: #774fd1;
    outline: none;
    box-shadow: 0 0 2px rgba(119, 79, 209, 0.7);
  }
`;

const Textarea = styled.textarea`
  font-family: "Archivo", sans-serif;
  font-weight: 100;
  font-size: 12px;
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;

  &::placeholder {
    color: #999;
    font-family: "Archivo", sans-serif;
    font-weight: 100;
    font-size: 13px;
  }

  &:focus {
    border-color: #774fd1;
    outline: none;
    box-shadow: 0 0 2px rgba(119, 79, 209, 0.7);
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
  font-family: "Archivo", sans-serif;
  font-weight: 600;
  width: 30%;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 20px auto 0;
  padding: 10px 20px;
  background-color: ${({ cor }) => cor || "#9186A7"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  margin: 20px;
  &:hover {
    background-color: ${({ cor }) => (cor ? "#177c44" : "#79679d")};
  }
`;

const Header = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  letter-spacing: 0.9px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  padding: 20px;
  color: #ffff;
  background-color: #774fd1;
  border-radius: 8px;
`;

const ModalAdicionar = ({ onClose, onSave, professores }) => {
  
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [link, setLink] = useState("");


 
  const handleSave = () => {
    const atividade = {
      titulo,
      descricao,
      professorId: Number(professorId),
      cargaHoraria,
      link,
    };

    console.log(atividade); 
    onSave(atividade); 
  };



  return (
    <Overlay onClick={onClose}>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <Header>NOVA ATIVIDADE</Header>
        <ContainerInputsLabels>
          <Div>
            <Label>Título:</Label>
            <Input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Adicione o título da atividade"
            />
            <Label>Descrição:</Label>
            <Textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Adicione a descrição da atividade"
            />
          </Div>
          <Div>
            <Label htmlFor="professor">Professor:</Label>
            <Select
              name="professor"
              value={professorId}
              onChange={(e) => setProfessorId(e.target.value)} 
            >
              <option value="">Selecione um professor</option>
              {professores.map((professor) => (
                <option key={professor.id} value={professor.id}>
                  {professor.nomeCompleto}
                </option> 
              ))}
            </Select>

            <Label>Carga Horária:</Label>
            <Input
              value={cargaHoraria}
              onChange={(e) => setCargaHoraria(e.target.value)}
              placeholder="Adicione a carga horária da atividade"
            />
            <Label>Link:</Label>
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Adicione o link da atividade"
            />
          </Div>
        </ContainerInputsLabels>
        <ContainerBotoes>
          <Button cor={"#1EB662"} onClick={handleSave}>
            Salvar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ContainerBotoes>
      </ContainerAdc>
    </Overlay>
  );
};

ModalAdicionar.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  professores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, 
      nome: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ModalAdicionar;
