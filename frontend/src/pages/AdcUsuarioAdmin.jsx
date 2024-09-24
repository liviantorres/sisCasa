import Header from "../components/Header";
import { IoMdAddCircleOutline } from "react-icons/io";
import { styled } from "styled-components";
import { useState } from "react";
import FormAdcUsuario from "../components/AdminUsuarios/FormAdcUsuario"

const ContainerConteudo = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Titulo = styled.h2`
  font-family: "Archivo", sans-serif;
  font-weight: 300;
  font-size: 30px;
  color: #202b3b;
  margin-bottom: 40px;
`;

const Botao = styled.button`
  background-color: #774fd1;
  font-family: "Archivo", sans-serif;
  font-weight: 600;
  display: flex;
  text-transform: uppercase;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 18%;
  height: 3rem;
  border-radius: 8px;
  border: none;
  background-color: #774fd1;
  text-transform: uppercase;
  letter-spacing: 0.75px;
  color: #ffffff;
  margin: 10px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    background-color: "#6a3cc8";
    transform: scale(1.05);
  }
`;

const UsuarioLista = styled.ul`
  list-style-type: none;
  padding: 0;
  font-family: "Archivo", sans-serif;
`;

const UsuarioItem = styled.li`
  background-color: #ffffff;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const UsuarioNome = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #333333;
`;

const UsuarioFuncao = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #606060;
  background-color: #f0f0f5;
  padding: 5px 15px;
  border-radius: 20px;
`;


const usuarios = [
  { nome: "João Silva", funcao: "Administrador" },
  { nome: "Maria Oliveira", funcao: "Professor" },
  { nome: "Carlos Souza", funcao: "Professor" },
  { nome: "Ana Costa", funcao: "Servidor" },
];

const AdcUsuarioAdmin = () => {
    const [modaldAdcUsuario, setModalAdcUsuario] = useState(false);

    //Modal Adicionar Usuario
    const handleCloseModalAdcUsuario = () =>{
        setModalAdcUsuario(false)
    }
    const handleOpenModalAdcUsuario = () =>{
        setModalAdcUsuario(true)
    }


  return (

    <>
      <Header />
      <ContainerConteudo>
        <Div>
          <Titulo>Usuários Cadastrados</Titulo>
          <Botao onClick={handleOpenModalAdcUsuario}>
            <IoMdAddCircleOutline size={18} /> Adicionar usuário
          </Botao>
        </Div>
        <UsuarioLista>
          {usuarios.map((usuario, index) => (
            <UsuarioItem key={index}>
              <UsuarioNome>{usuario.nome}</UsuarioNome>
              <UsuarioFuncao>{usuario.funcao}</UsuarioFuncao>
            </UsuarioItem>
          ))}
        </UsuarioLista>
        {modaldAdcUsuario && (
            <FormAdcUsuario onClose={handleCloseModalAdcUsuario}/>
        )}
      </ContainerConteudo>
    </>
  );
};

export default AdcUsuarioAdmin;
