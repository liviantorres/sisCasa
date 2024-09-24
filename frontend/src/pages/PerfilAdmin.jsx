import Header from "../components/Header";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import ModalEditarPerfil from "../components/AdminPerfil/ModalEditarPerfil";
import { useState } from "react";


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
  & div{
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
    const [userData, setUserData] = useState({
      name: "Amanda Pires",
      email: "admin@email.com",
      siape: "1234567",
      cpf: "123.456.789-00",
      dob: "1980-01-01",
      whatsapp: "(12) 98765-4321",
    });
  
    const handleSave = (updatedData) => {
      setUserData(updatedData);
    };
  
    return (
      <>
        <Header />
       
          <ContainerPerfil>
            <InfoPerfil>
              <ContainerTop>
                <User />
                <div>
                  <Nome>{userData.name}</Nome>
                  <Role>Função: Administrador do Sistema</Role>
                  <Email>Email: {userData.email}</Email>
                </div>
                <EditIcon onClick={() => setIsModalOpen(true)} />
              </ContainerTop>
              <ContainerBottom>
                <div>
                  <InfoAdicional>SIAPE: {userData.siape}</InfoAdicional>
                  <InfoAdicional>CPF: {userData.cpf}</InfoAdicional>
                </div>
                <div>
                  <InfoAdicional>Data de Nascimento: {userData.dob}</InfoAdicional>
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
      
      </>
    );
  };

export default PerfilAdmin;
