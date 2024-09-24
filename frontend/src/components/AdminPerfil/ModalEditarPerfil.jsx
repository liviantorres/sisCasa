import { useState } from "react";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: absolute;
  background: #ffffff;
  padding: 40px;
  border-radius: 15px;
  width: 600px; 
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease-in-out;
  display: flex; 
  flex-direction: column; 
  justify-content: space-between; 
  
`;

const ModalHeader = styled.h2`
  margin-bottom: 20px;
  font-weight: 500;
  color: #333;
  font-size: 24px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  transition: border-color 0.3s;
  width: 90%; 
  &:focus {
    border-color: #774fd1;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #774fd1;
  color: white;
  padding: 8px 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  transition: background-color 0.3s;
  width: 40%; 
  align-self: center; 
  &:hover {
    background-color: #603abf;
  }
`;

const CloseIcon = styled(IoIosClose)`
  position: absolute;
  right: 8px; 
  top: 5px;
  cursor: pointer;
  font-size: 32px;
  color: #000000c6;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  gap: 20px; 
  flex: 1; 
  margin-bottom: 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; 
  flex: 1; 
`;

const ModalEditarPerfil = ({ isOpen, close, userData, onSave }) => {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [siape, setSiape] = useState(userData.siape);
  const [cpf, setCpf] = useState(userData.cpf);
  const [dob, setDob] = useState(userData.dob);
  const [whatsapp, setWhatsapp] = useState(userData.whatsapp);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { name, email, siape, cpf, dob, whatsapp };
    onSave(updatedData);
    close();
  };

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>Editar Perfil</ModalHeader>
        <CloseIcon onClick={close} />
        <Form onSubmit={handleSubmit}>
          <Column>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <Input value={siape} onChange={(e) => setSiape(e.target.value)} placeholder="SIAPE" />
          </Column>
          <Column>
            <Input value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="CPF" />
            <Input value={dob} onChange={(e) => setDob(e.target.value)} type="date" />
            <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="WhatsApp" />
          </Column>
        </Form>
        <Button type="submit">Salvar</Button>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalEditarPerfil;
