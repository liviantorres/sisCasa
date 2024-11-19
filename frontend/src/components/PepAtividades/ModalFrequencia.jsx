import styled from "styled-components";
import { IoIosClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { darken } from "polished";
import axios from "axios";
import ModalNovaFrequencia from "./ModalNovaFrequencia";

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
    background-color: ${(props) => (props.checked ? "#774fd1" : "#ffff")};
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

const ModalFrequencia = ({ onClose, atividade }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [frequenciaAlunos, setFrequenciaAlunos] = useState([]);
  const [showNovaFrequencia, setShowNovaFrequencia] = useState(false);

  const initializeFrequenciaAlunos = (date) => {
    const frequencia = atividade?.frequencia?.find((f) => f.data === date);
    setFrequenciaAlunos(frequencia ? frequencia.alunos : []);
  };

  useEffect(() => {
    initializeFrequenciaAlunos(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSituacaoChange = (alunoId, situacao) => {
    setFrequenciaAlunos((prevFrequencia) =>
      prevFrequencia.map((aluno) =>
        aluno.alunoId === alunoId ? { ...aluno, situacao } : aluno
      )
    );
  };

  const handleSalvar = async () => {
    if (
      !atividade ||
      !atividade.frequencia ||
      !Array.isArray(atividade.frequencia)
    ) {
      alert("Nenhuma frequência disponível para salvar.");
      return;
    }

    console.log("Atividade:", atividade);
    console.log("Frequências:", atividade?.frequencia);

    const frequenciaData = {
      frequencia: atividade.frequencia.map((f) => ({
        data: f.data,
        alunos: Array.isArray(f.alunos)
          ? f.alunos.map((aluno) => ({
              alunoId: aluno.alunoId,
              nomeCompleto: aluno.nomeCompleto,
              situacao:
                frequenciaAlunos.find((a) => a.alunoId === aluno.alunoId)
                  ?.situacao || aluno.situacao,
            }))
          : [],
      })),
    };

    try {
      const token = localStorage.getItem("token");
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

  const handleOpenModalNovaFrequencia = () => {
    setShowNovaFrequencia(true);
  };

  const handleNovaFrequenciaSalva = () => {
    setShowNovaFrequencia(false);
    atualizarDadosFrequencia();
  };

  const handleCloseModalNovaFrequencia = () => {
      setShowNovaFrequencia(false)
      onClose()
  };

    // Função para atualizar dados de frequência
    const atualizarDadosFrequencia = async (atividadeId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/atividade/${atividadeId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFrequenciaAlunos(response.data.frequencia || []);
      } catch (error) {
        console.error("Erro ao buscar dados de frequência:", error);
      }
    };

  return (
    <Overlay onClick={onClose}>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseIcon onClick={onClose} /> FREQUÊNCIA
        </Header>

        <ContainerInputsLabels>
          <Label>SELECIONE A DATA:</Label>
          <Select value={selectedDate} onChange={handleDateChange}>
            <option value="">Selecione uma data</option>
            {atividade?.frequencia?.map((frequencia, index) => (
              <option key={index} value={frequencia.data}>
                {frequencia.data}
              </option>
            ))}
          </Select>
        </ContainerInputsLabels>

        {frequenciaAlunos.length > 0 ? (
          <div>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Aluno</TableHeader>
                  <TableHeader>Presente?</TableHeader>
                </tr>
              </thead>
              <tbody>
                {frequenciaAlunos.map((aluno) => (
                  <tr key={aluno.alunoId}>
                    <TableCell>{aluno.nomeCompleto}</TableCell>
                    <TableCell>
                      <RadioContainer>
                        <CustomRadio checked={aluno.situacao === "Presente"}>
                          <input
                            type="radio"
                            name={`presenca-${aluno.alunoId}`}
                            value="sim"
                            checked={aluno.situacao === "Presente"}
                            onChange={() =>
                              handleSituacaoChange(aluno.alunoId, "Presente")
                            }
                          />
                          Sim
                        </CustomRadio>
                        <CustomRadio checked={aluno.situacao === "Ausente"}>
                          <input
                            type="radio"
                            name={`presenca-${aluno.alunoId}`}
                            value="nao"
                            checked={aluno.situacao === "Ausente"}
                            onChange={() =>
                              handleSituacaoChange(aluno.alunoId, "Ausente")
                            }
                          />
                          Não
                        </CustomRadio>
                      </RadioContainer>
                    </TableCell>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <NoFrequencyMessage>
            Nenhuma frequência registrada para a data selecionada.
          </NoFrequencyMessage>
        )}
        <ContainerBotoes>
          <Button onClick={handleOpenModalNovaFrequencia}>
            Nova Frequência
          </Button>
          <Button onClick={handleSalvar}>Salvar</Button>
        </ContainerBotoes>
        {showNovaFrequencia && (
          <ModalNovaFrequencia
            atividade={atividade}
            onClose={handleCloseModalNovaFrequencia}
            onNovaFrequenciaSalva={handleNovaFrequenciaSalva}
          />
        )}
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalFrequencia;
