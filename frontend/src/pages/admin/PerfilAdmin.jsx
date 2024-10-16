import Header from "../../components/Header";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
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

const Role = styled.p`
  font-family: "Archivo", sans-serif;
  font-size: 18px;
  color: #999;
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
  & div {
    margin-top: 60px;
  }
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

const PerfilAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
    
      try {
        const response = await axios.get('http://localhost:3000/user/usuario', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message || 'Falha ao buscar dados do usuário');
        } else {
          setErrorMessage('Erro ao conectar com o servidor');
        }
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

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
  
      console.log('Usuário editado:', response.data);
      setUserData(prevUserData => ({
        ...prevUserData,
        ...response.data,
      }));
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
              <Role>Função: {userData.roleId}</Role>
              <Email>Email: {userData.email}</Email>
              <Email>SIAPE: {userData.siape}</Email>
            </div>
            <EditIcon onClick={() => setIsModalOpen(true)} />
          </ContainerTop>
          <ContainerBottom>
            <div>
             
              <InfoAdicional>CPF: {userData.cpf}</InfoAdicional>
              <InfoAdicional>Genero: {userData.genero}</InfoAdicional>
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
      />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </>
  );
};

export default PerfilAdmin;
