import Header from "../../components/Header";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { FaEdit, FaGraduationCap } from "react-icons/fa";
import ModalEditarPerfil from "../../components/AdminPerfil/ModalEditarPerfil";
import { useState, useEffect } from "react";
import axios from "axios";


const ContainerPerfil = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 50px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 15px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

const InfoPerfil = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Nome = styled.h2`
  font-family: "Archivo", sans-serif;
  font-size: 28px;
  margin: 0;
  color: #333;
`;

const Email = styled.p`
  font-family: "Archivo", sans-serif;
  font-size: 20px;
  margin: 8px 0;
  color: #666;
`;


const InfoAdicional = styled.p`
  font-family: "Archivo", sans-serif;
  font-size: 20px;
  margin: 50px 10px;
  color: #444;
`;

const User = styled(FaRegUserCircle)`
  color: #774fd1;
  cursor: pointer;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 30px;
`;

const ContainerTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ContainerBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  margin: 0px;
`;

const EditIcon = styled(FaEdit)`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #666;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: #ddd;
  border-radius: 20px;
  margin: 20px 0;
  height: 20px;
  overflow: hidden;
  margin-top: 20px;
`;

const Progresso = styled.h3`
  font-family: "Archivo", sans-serif;
  margin-top: 20px;
  margin-bottom: 20px;
  & h4{
    color: #000000be;
  }
`;

const Progress = styled.div`
  width: ${({ percentage }) => percentage}%;
  background-color: #774FD1;
  height: 100%;
  transition: width 0.3s ease;
`;

const CursoInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Archivo", sans-serif;
  font-size: 18px;
  color: #444;
  margin-top: 20px;

  & svg {
    color: #774FD1;
    font-size: 24px;
  }
`;

const PerfilPep = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [roles, setRoles] = useState([]); 
  const [horasConcluidas, setHorasConcluidas] = useState(null);

  const percentage = (horasConcluidas / 128) * 100;

  const availableRoles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Servidor' },
    { id: 3, name: 'Professor' }
  ];

  const filteredRoles = availableRoles.filter(
    (role) => role.name !== 'Admin' || roles.some((r) => r.roleName === 'Admin')
  );

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.get('http://localhost:3000/user/usuario', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      setRoles(response.data.Roles);
      setHorasConcluidas(response.data.horasConcluidas);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Falha ao buscar dados do usuário');
      } else {
        setErrorMessage('Erro ao conectar com o servidor');
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSave = async (userId, updatedData) => {
    const token = localStorage.getItem('token'); 
  
    try {
      const response = await axios.put(`http://localhost:3000/user/editar/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      
      setUserData(prevUserData => ({
        ...prevUserData,
        ...response.data,
      }));
      setRoles(response.data.Roles || []); 
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  };

  if (!userData) {
    return <p>Carregando dados do usuário...</p>;
  }
 

  return (
    <>
      <Header />

      <ContainerPerfil>
        <InfoPerfil>
          <ContainerTop>
            <User />
            <div>
              <Nome>{userData.nomeCompleto || userData.name}</Nome>
              <Email>Email: {userData.email}</Email>
              <Email>SIAPE: {userData.siape}</Email>
            </div>
            <EditIcon onClick={() => setIsModalOpen(true)} />
          </ContainerTop>
          <div>
            <Progresso>Progresso: <h4>{horasConcluidas} / 128 horas</h4></Progresso>
            <ProgressBar>
              <Progress percentage={percentage} />
            </ProgressBar>
          </div>
          <ContainerBottom>
            <div>
              <InfoAdicional>CPF: {userData.cpf}</InfoAdicional>
              <InfoAdicional>Função: {roles.length > 0 ? roles.map(role => role.roleName).join(", ") : "Nenhum papel atribuído"}</InfoAdicional>
            </div>
            <div>
              <InfoAdicional>Data de Nascimento: {userData.dataDeNascimento}</InfoAdicional>
              <InfoAdicional>WhatsApp: {userData.whatsapp}</InfoAdicional>
            </div>
          </ContainerBottom>
        </InfoPerfil>
      </ContainerPerfil>

      <ModalEditarPerfil
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        userData={userData}
        onSave={handleSave}
        roles={roles}
        availableRoles={filteredRoles} 
      />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </>
  );
};


export default PerfilPep;
