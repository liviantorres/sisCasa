import styled from "styled-components";
import { IoIosClose } from "react-icons/io";
import { useState, useEffect } from "react";


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

const ScrollableAtividades = styled.div`
  max-height: 400px; 
  overflow-y: auto; 
  overflow-x: hidden; 
  padding: 10px; 
`;


const ModalAprovacao = ({ onClose, atividade }) => {
  const [situacoes, setSituacoes] = useState({});

const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    console.log("atividade " + atividade)
    setAlunos(atividade.Users);
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

  return (
    <Overlay onClick={onClose}>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
     
        <Header>
          <CloseIcon size={35} onClick={onClose} /> ALUNOS
        </Header>
        <ScrollableAtividades>
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
                        disabled
                      />
                      Aprovado
                    </CustomRadio>
                    <CustomRadio checked={situacoes[aluno.id] === "reprovado"}>
                      <input
                        type="radio"
                        name={`situacao-${aluno.id}`}
                        value="reprovado"
                        onChange={() => handleSituacaoChange(aluno.id, "reprovado")}
                        disabled
                      />
                      Reprovado
                    </CustomRadio>
                  </RadioContainer>
                </TableCell>
              </tr>
            ))}
          </tbody>
          
        </Table>
        </ScrollableAtividades>
      </ContainerAdc>
      
    </Overlay>
  );
};

export default ModalAprovacao;
