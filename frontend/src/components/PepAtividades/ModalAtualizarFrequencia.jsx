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


const Label = styled.label`
  font-family: "Archivo", sans-serif;
  font-weight: 400;
  color: #333;
margin: 10px;
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

  & p {
    color: ${(props) => (props.situacao === "Presente" ? "green" : "red")};
    font-weight: 500;
  }
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

const NoFrequencyMessage = styled.p`
  font-family: "Archivo", sans-serif;
  font-size: 18px;
  color: #202b3b;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: 500;
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

const ScrollableAtividades = styled.div`
  max-height: 400px; 
  overflow-y: auto; 
  overflow-x: hidden; 
  padding: 10px; 
`;



const ModalAtualizarFrequencia = ({ atividade, data, onClose }) => {
  const [frequenciaAlunos, setFrequenciaAlunos] = useState([]);

  const handleAtualizar = async () => {
    if (!data) {
      alert("Por favor, selecione uma data.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  
      for (const frequencia of frequenciaAlunos) {
        const { id, situacao } = frequencia;
  
        if (!situacao) continue;
  
        const frequenciaAtualizada = {
          data: frequencia.data,
          situacao,
          atividadeId: atividade.id,
        };
  
        await axios.put(
          `https://scasa.ufc.br/api/frequencia/${id}`,
          frequenciaAtualizada,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
  
      alert("Frequências atualizadas com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar as frequências:", error);
      alert("Ocorreu um erro ao atualizar as frequências.");
    }
  };

  useEffect(() => {
    fetchFrequencias();
  }, [data]);

  const fetchFrequencias = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://scasa.ufc.br/api/frequencia/atividade/${atividade.id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const alunosDaData = response.data.filter(frequencia => {
        const frequenciaData = new Date(frequencia.data).toISOString().split("T")[0];
        return frequenciaData === data; 
      });

      setFrequenciaAlunos(alunosDaData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSituacaoChange = (frequenciaId, novaSituacao) => {
    setFrequenciaAlunos((prevState) =>
      prevState.map((frequencia) =>
        frequencia.id === frequenciaId
          ? { ...frequencia, situacao: novaSituacao } 
          : frequencia
      )
    );
  };

  return (
    <Overlay onClick={onClose}>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseIcon onClick={onClose} /> ATUALIZAR FREQUÊNCIA
        </Header>

        <Label>DATA SELECIONADA: {data}</Label>
<ScrollableAtividades>
        {frequenciaAlunos.length > 0 ? (
          <div>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Aluno</TableHeader>
                  <TableHeader>Situação</TableHeader>
                </tr>
              </thead>
              <tbody>
                {frequenciaAlunos.map((frequencia) => (
                  <tr key={frequencia.id}>
                    <TableCell>{frequencia.User.nomeCompleto}</TableCell>
                    <TableCell>
                      <select
                        value={frequencia.situacao}
                        onChange={(e) =>
                          handleSituacaoChange(frequencia.id, e.target.value)
                        }
                      >
                        <option value="Presente">Presente</option>
                        <option value="Ausente">Ausente</option>
                      </select>
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
</ScrollableAtividades>
        <ContainerBotoes>
          <Button onClick={handleAtualizar}>Salvar</Button>
        </ContainerBotoes>
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalAtualizarFrequencia;
