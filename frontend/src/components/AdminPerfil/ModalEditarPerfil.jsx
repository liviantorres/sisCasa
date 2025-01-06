import { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

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
  text-transform: uppercase;
  margin-bottom: 20px;
  font-weight: 500;
  color: #333;
  font-size: 24px;
`;

const Label = styled.label`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  margin-bottom: 0px;
  color: #333;
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
  width: 80%;
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

const ModalEditarPerfil = ({ isOpen, close, userData, onSave, availableRoles }) => {
  const [nomeCompleto, setNomeCompleto] = useState(userData.nomeCompleto);
  const [email, setEmail] = useState(userData.email);
  const [siape, setSiape] = useState(userData.siape);
  const [cpf, setCpf] = useState(userData.cpf);
  const [whatsapp, setWhatsapp] = useState(userData.whatsapp);
  const [selectedRoles, setSelectedRoles] = useState([]); 
  const navigate = useNavigate();

  const formattedDataDeNascimento = userData.dataDeNascimento
    ? userData.dataDeNascimento.split('/').reverse().join('-')
    : '';

  const [dataDeNascimentoSecund, setDataDeNascimentoSecund] = useState(formattedDataDeNascimento);

  const handleRoleChange = (roleId) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

 
  useEffect(() => {
    if (userData && userData.Roles) {
      setSelectedRoles(userData.Roles.map(role => role.id));
    }
  }, [userData]);

  if (!isOpen) return null;

  const handleSave = () => {
    const dataDeNascimento = dataDeNascimentoSecund.split('-').reverse().join('/');

    const updatedData = {
      nomeCompleto,
      email,
      siape,
      cpf,
      whatsapp,
      dataDeNascimento,
      roleIds: selectedRoles,
    };

    const usuarioId = userData.id;

    console.log('Dados atualizados:', updatedData); 

    onSave(usuarioId, updatedData);  
    close();
   
  };

  const isAdmin = userData.Roles.some(role => role.name === 'admin');

  const rolesToDisplay = isAdmin
    ? availableRoles
    : availableRoles.filter(role => role.name !== 'admin');

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalHeader>Editar Perfil</ModalHeader>
        <CloseIcon onClick={close} />
        <Form>
          <Column>
            <Label>Nome</Label>
            <Input
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              placeholder="Nome"
            />

            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <Label>SIAPE</Label>
            <Input
              value={siape}
              onChange={(e) => setSiape(e.target.value)}
              placeholder="SIAPE"
            />
          </Column>
          <Column>
            <Label>CPF</Label>
            <Input
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="CPF"
            />

            <Label>Data de Nascimento</Label>
            <Input
              value={dataDeNascimentoSecund}
              onChange={(e) => setDataDeNascimentoSecund(e.target.value)}
              type="date"
            />

            <Label>WhatsApp</Label>
            <Input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="WhatsApp"
            />

            <Label>Roles</Label>
            {rolesToDisplay.map((role) => (
              <div key={role.id}>
                <input
                  type="checkbox"
                  id={`role-${role.id}`}
                  checked={selectedRoles.includes(role.id)}
                  onChange={() => handleRoleChange(role.id)}
                />
                <label htmlFor={`role-${role.id}`}>{role.name}</label>
              </div>
            ))}

            <Button onClick={handleSave}>Salvar</Button>
          </Column>
        </Form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalEditarPerfil;
