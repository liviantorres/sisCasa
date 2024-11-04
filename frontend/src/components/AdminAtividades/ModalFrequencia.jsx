import styled from "styled-components";
import { IoIosClose } from "react-icons/io";

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

const Input = styled.input`
  font-family: "Archivo", sans-serif;
  font-weight: 400;
  color: #000;
  border: 1px solid #ccc;
  width: 30%;
  height: 30px;
  border-radius: 6px;
  padding: 0 10px;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #774fd1;
    outline: none;
    box-shadow: 0 0 5px rgba(119, 79, 209, 0.7);
  }
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

const ModalFrequencia = ({ onClose, atividade }) => {
  console.log("Atividade:", atividade);
  console.log("Frequências:", atividade?.frequencias); 

  return (
    <Overlay onClick={onClose}>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <Header>
          <CloseIcon onClick={onClose} /> FREQUÊNCIA
        </Header>

        {atividade?.frequencias?.length > 0 ? (
          atividade.frequencias.map((frequencia, index) => (
            <div key={index}>
              <ContainerInputsLabels>
                <Label>DATA:</Label>
                <Input type="date" value={frequencia.data} disabled />
              </ContainerInputsLabels>

              <Table>
                <thead>
                  <tr>
                    <TableHeader>Aluno</TableHeader>
                    <TableHeader>Presente?</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {frequencia.alunos.map((aluno) => (
                    <tr key={aluno.idAluno}>
                      <TableCell>{aluno.nome}</TableCell>
                      <TableCell>
                        <RadioContainer>
                        <CustomRadio checked={aluno.presente}>
                            <input 
                              type="radio" 
                              name={`presenca-${aluno.idAluno}`} 
                              value="sim" 
                              checked={aluno.presente} 
                              readOnly 
                            />
                            Sim
                          </CustomRadio>
                          <CustomRadio checked={!aluno.presente}>
                            <input 
                              type="radio" 
                              name={`presenca-${aluno.idAluno}`} 
                              value="nao" 
                              checked={!aluno.presente} 
                              readOnly 
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
          ))
        ) : (
          <NoFrequencyMessage>Nenhum aluno registrado.</NoFrequencyMessage>
        )}
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalFrequencia;
