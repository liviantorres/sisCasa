import styled from "styled-components";
import { IoIosClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { darken } from "polished";
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

const ContainerInputsLabels = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 20px;
`;

const Label = styled.label`
  font-family: "Archivo", sans-serif;
  font-weight: 600;
  color: #333;
`;


const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  padding: 0px;
  margin-bottom: 30px;
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
  flex-direction: row;
  gap: 10px;
  justify-content: center;
`;

const Header = styled.div`
  position: relative;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  letter-spacing: 0.9px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  padding: 20px;
  color: #fff;
  background-color: #774fd1;
  border-radius: 8px;
`;

const CloseIcon = styled(IoIosClose)`
  position: absolute;
  right: 8px;
  top: 5px;
  cursor: pointer;
  font-size: 32px;
  color: #000000c6;
`;

const CustomRadio = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
 

  input {
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
    background-color: ${(props) => (props.checked ? '#774fd1' : '#ffff')}; 
    transition: background-color 0.3s; 
  }


  input:checked + &::before {
    background-color: #774fd1; 
  }


  input:checked + &::after {
    content: "";
    display: block;
    width: 8px; 
    height: 8px; 
    border-radius: 50%; 
    background-color: white; 
    position: absolute; 
    top: 2px; 
    left: 2px; 
  }
`;

const NoFrequencyMessage = styled.p`
  font-family: "Archivo", sans-serif;
  font-size: 18px;
  color: #202b3b; 
  text-align: center; 
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 500; 
`;

const Select = styled.select`
  font-family: "Archivo", sans-serif;
  font-weight: 400;
  color: #000;
  border: 1px solid #ccc;
  width: 30%;
  height: 30px;
  border-radius: 6px;
  padding: 0 10px;

  &:focus {
    border-color: #774fd1;
    outline: none;
    box-shadow: 0 0 5px rgba(119, 79, 209, 0.7);
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


const NoStudentsMessage = styled.p`
  font-family: "Archivo", sans-serif;
  font-size: 18px;
  color: #202b3b;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const ModalNovaFrequencia = ({ onClose, atividade}) => {
  const [alunos, setAlunos] = useState([]);
  const [selectedAlunos, setSelectedAlunos] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  const fetchAlunos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3000/user/${atividade.id}/atividades`,{
          headers:{
              Authorization: `Bearer ${token}`,
          }
      });
      console.log(response.data);
      setAlunos(response.data);
    } catch (error) {
    
      console.error("Erro ao buscar alunos:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
  
    fetchAlunos();
  }, []);

  const handleSituacaoChange = (alunoId, situacao) => {
    setSelectedAlunos((prev) => ({
      ...prev,
      [alunoId]: situacao,
    }));
  };

  const handleSalvar = async () => {
    if (!selectedDate) {
      alert("Por favor, selecione uma data.");
      return;
    }
  
    const novaFrequencia = {
      data: selectedDate,
      alunos: Object.keys(selectedAlunos).map((alunoId) => ({
        alunoId: parseInt(alunoId),
        nomeCompleto: alunos.find((aluno) => aluno.id === parseInt(alunoId)).nomeCompleto,
        situacao: selectedAlunos[alunoId],
      })),
    };
  
    const frequenciasAnteriores = atividade.frequencia || [];
    const frequenciaAtualizada = [...frequenciasAnteriores, novaFrequencia];
    
    const frequenciaData = {
      frequencia: frequenciaAtualizada
    };
  
    if (frequenciaData.frequencia[0].alunos.length === 0) {
      alert("Por favor, selecione a presença dos alunos.");
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3000/atividade/${atividade.id}/frequencias`,
        frequenciaData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        alert("Frequência salva com sucesso!");
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao salvar a frequência:", error);
      alert("Ocorreu um erro ao salvar a frequência.");
    }
  };
  

  return (
    <Overlay onClick={onClose}>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseIcon onClick={onClose} /> NOVA FREQUÊNCIA
        </Header>

        <ContainerInputsLabels>
          <Label>Selecione a Data:</Label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </ContainerInputsLabels>

        {alunos.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <TableHeader>Aluno</TableHeader>
                <TableHeader>Presente?</TableHeader>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id}>
                  <TableCell>{aluno.nomeCompleto}</TableCell>
                  <TableCell>
                    <RadioContainer>
                      <CustomRadio checked={selectedAlunos[aluno.id] === "Presente"}>
                        <input
                          type="radio"
                          name={`presenca-${aluno.id}`}
                          value="Presente"
                          checked={selectedAlunos[aluno.id] === "Presente"}
                          onChange={() => handleSituacaoChange(aluno.id, "Presente")}
                        />
                        Presente
                      </CustomRadio>
                      <CustomRadio checked={selectedAlunos[aluno.id] === "Ausente"}>
                        <input
                          type="radio"
                          name={`presenca-${aluno.id}`}
                          value="Ausente"
                          checked={selectedAlunos[aluno.id] === "Ausente"}
                          onChange={() => handleSituacaoChange(aluno.id, "Ausente")}
                        />
                        Ausente
                      </CustomRadio>
                    </RadioContainer>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <NoStudentsMessage>Nenhum aluno disponível.</NoStudentsMessage>
        )}

        <ContainerBotoes>
          <Button onClick={handleSalvar}>Salvar</Button>
        </ContainerBotoes>
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalNovaFrequencia;
