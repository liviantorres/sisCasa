import styled from "styled-components";
import { useState } from "react";
import { IoIosClose  } from "react-icons/io";

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
  padding: 0px ;
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
const CloseIcon = styled(IoIosClose )`
  position: absolute;
  right: 8px; 
  top: 5px;
  cursor: pointer;
  font-size: 32px;
  color: #000000c6;
`;

const RadioInput = styled.input`
  display: none;
`;

const CustomRadio = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;

  &::before {
    content: "";
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 2px solid #774fd1;
    border-radius: 50%;
    margin-right: 6px;
    background-color: white;
    transition: background-color 0.3s;
  }

  ${RadioInput}:checked + &::before {
    background-color: #774fd1;
  }
`;

const ModalFrequencia = ({ onClose }) => {
  const [data, setData] = useState("");


  return (
    <Overlay onClick={onClose}>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
     
        <Header> <CloseIcon onClick={onClose}/> FREQUÊNCIA</Header>
        <ContainerInputsLabels>
          <Label htmlFor="data">DATA:</Label>
          <Input
            id="data"
            placeholder="Adicione a data"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            disabled
          />
        </ContainerInputsLabels>

        <Table>
          <thead>
            <tr>
              <TableHeader>Aluno</TableHeader>
              <TableHeader>Presente?</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>Teste 1</TableCell>
              <TableCell>
                <RadioContainer>
                  <RadioInput
                    type="radio"
                    id="presente1-sim"
                    name="presente1"
                    disabled
                  />
                  <CustomRadio htmlFor="presente1-sim"  >Sim</CustomRadio>
                  <RadioInput
                    type="radio"
                    id="presente1-nao"
                    name="presente1"
                    disabled
                  />
                  <CustomRadio htmlFor="presente1-nao">Não</CustomRadio>
                </RadioContainer>
              </TableCell>
            </tr>
            <tr>
              <TableCell>Teste 2</TableCell>
              <TableCell>
                <RadioContainer>
                  <RadioInput
                    type="radio"
                    id="presente2-sim"
                    name="presente2"
                    disabled
                  />
                  <CustomRadio htmlFor="presente2-sim">Sim</CustomRadio>

                  <RadioInput
                    type="radio"
                    id="presente2-nao"
                    name="presente2"
                    disabled
                  />
                  <CustomRadio htmlFor="presente2-nao">Não</CustomRadio>
                </RadioContainer>
              </TableCell>
            </tr>
          </tbody>
        </Table>
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalFrequencia;
