import styled from "styled-components";
import { IoIosClose } from "react-icons/io";
import { darken } from "polished";
import { useState, useEffect } from "react";
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
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 40%;
  z-index: 1000;
`;

const Table = styled.table`
  width: 100%;
  margin-bottom: 30px;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px 0px;
  background-color: transparent;
  font-weight: bold;
  border-bottom: 1px solid #774fd1;
  font-family: "Archivo", sans-serif;
  text-transform: uppercase;
`;

const TableCell = styled.td`
  padding: 12px 0px;
  font-family: "Archivo", sans-serif;
  background-color: #f4f4f4;
  text-align: center;
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const CustomRadio = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;

  input[type="radio"] {
    display: none;
  }

  &::before {
    content: "";
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 2px solid #774fd1;
    border-radius: 50%;
    margin-right: 6px;
    background-color: ${(props) => (props.checked ? '#774fd1' : '#fff')};
    transition: background-color 0.3s;
  }
`;

const Header = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  letter-spacing: 0.9px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #fff;
  background-color: #774fd1;
  border-radius: 8px 8px 0 0; 
  font-size: 24px;
`;
const CloseIcon = styled(IoIosClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #ffffffc6;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const Button = styled.button`
  font-family: "Archivo", sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  width: 30%;
  padding: 12px 0px;
  margin: 20px;
  background-color: #774fd1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${darken(0.1, "#774fd1")};
  }

  &:active {
    background-color: ${darken(0.2, "#774fd1")};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ModalVisualizar = ({ alunos, onClose, atividade }) => {
  const [situacoes, setSituacoes] = useState({});

  useEffect(() => {
    const situacaoInicial = {};
    alunos.forEach((aluno) => {
      situacaoInicial[aluno.id] = aluno.UserAtividade.situacao;
    });
    setSituacoes(situacaoInicial);
  }, [alunos]);

  const handleSituacaoChange = (alunoId, situacao) => {
    setSituacoes((prev) => ({
      ...prev,
      [alunoId]: situacao,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const requests = alunos.map((aluno) => {
        return axios.put(
          `http://localhost:3000/atividade/${atividade.id}/aluno/${aluno.id}/situacao`,
          { situacao: situacoes[aluno.id] },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      });
  
      await Promise.all(requests); 
      console.log("Situações atualizadas com sucesso!");
      alert("Situações atualizadas com sucesso!");
      onClose(); 
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar situação do aluno:", error.message);
    }
  };
  

  return (
    <Overlay onClick={onClose}>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseIcon size={35} onClick={onClose} /> ALUNOS
        </Header>
        <Table>
          <thead>
            <tr>
              <TableHeader>Aluno</TableHeader>
              <TableHeader>Situação?</TableHeader>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <TableCell>{aluno.nomeCompleto}</TableCell>
                <TableCell>
                  <RadioContainer>
                    <CustomRadio checked={situacoes[aluno.id] === "aprovado"}>
                      <input
                        type="radio"
                        name={`situacao-${aluno.id}`}
                        value="aprovado"
                        onChange={() => handleSituacaoChange(aluno.id, "aprovado")}
                      />
                      Aprovado
                    </CustomRadio>
                    <CustomRadio checked={situacoes[aluno.id] === "reprovado"}>
                      <input
                        type="radio"
                        name={`situacao-${aluno.id}`}
                        value="reprovado"
                        onChange={() => handleSituacaoChange(aluno.id, "reprovado")}
                      />
                      Reprovado
                    </CustomRadio>
                  </RadioContainer>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
        <ContainerBotoes>
          <Button onClick={handleSave}>Salvar</Button>
        </ContainerBotoes>
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalVisualizar;
