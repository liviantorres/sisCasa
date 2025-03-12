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

const ScrollableAtividades = styled.div`
  max-height: 400px; 
  overflow-y: auto; 
  overflow-x: hidden; 
  padding: 10px; 
`;



const ModalFrequencia = ({ onClose, atividade }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [frequenciaAlunos, setFrequenciaAlunos] = useState([]);

  useEffect(() => {
    fetchFrequencias();
  }, [selectedDate]);

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

      setFrequenciaAlunos(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const frequenciasFiltradas = frequenciaAlunos.filter((frequencia) => {
    const dataFrequencia = new Date(frequencia.data)
      .toISOString()
      .split("T")[0];
    return dataFrequencia === selectedDate;
  });

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
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
            {Array.from(
              new Set(
                frequenciaAlunos.map((frequencia) => {
                  const data = new Date(frequencia.data);
                  return data.toISOString().split("T")[0];
                })
              )
            ).map((dataFormatada, index) => (
              <option key={index} value={dataFormatada}>
                {dataFormatada}
              </option>
            ))}
          </Select>
        </ContainerInputsLabels>
<ScrollableAtividades>
        {frequenciasFiltradas.length > 0 ? (
          <div>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Aluno</TableHeader>
                  <TableHeader>Situação?</TableHeader>
                </tr>
              </thead>
              <tbody>
                {frequenciasFiltradas.map((frequencia) => (
                  <tr key={frequencia.id}>
                    <TableCell>{frequencia.User.nomeCompleto}</TableCell>
                    <TableCell situacao={frequencia.situacao}>
                      <p>{frequencia.situacao}</p>
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
         
        </ContainerBotoes>

        
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalFrequencia;
