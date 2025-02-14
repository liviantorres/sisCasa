import Header from "../../components/Header";
import { IoMdAddCircleOutline } from "react-icons/io";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import FormAdcUsuario from "../../components/AdminUsuarios/FormAdcUsuario";
import axios from "axios";

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
  color: #ffffff;
  margin: 10px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    background-color: #6a3cc8;
    transform: scale(1.05);
  }
`;

const UsuarioLista = styled.ul`
  list-style-type: none;
  padding: 0;
  font-family: "Arquivo", sans-serif;
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

const AdcUsuarioAdmin = () => {
  const [modalAdcUsuario, setModalAdcUsuario] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogadoId, setUsuarioLogadoId] = useState(null);

  const handleCloseModalAdcUsuario = () => {
    setModalAdcUsuario(false);
  };

  const handleOpenModalAdcUsuario = () => {
    setModalAdcUsuario(true);
  };

  const handleSave = async (novoUsuario) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://200.129.40.161:3000/auth/register",
        novoUsuario,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Usuário adicionado:", response.data);
      fetchUsuarios();
      setModalAdcUsuario(false);
    } catch (error) {
      if (error.response) {
        console.error("Erro ao adicionar usuário:", error.response.data);
        console.error("Status:", error.response.status);
      } else if (error.request) {
        console.error("Erro na requisição:", error.request);
      } else {
        console.error("Erro:", error.message);
      }
    }
  };

  const fetchUsuarios = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://200.129.40.161:3000/user/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Usuarios", response.data);
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("id");
    setUsuarioLogadoId(loggedInUserId);

    fetchUsuarios();
  }, []);

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
          {Array.isArray(usuarios) ? (
            usuarios.map((usuario) => (
              <UsuarioItem key={usuario.id}>
                <UsuarioNome>
                  {usuario.nomeCompleto}
                  {usuario.id === Number(usuarioLogadoId) && " (Você)"}
                </UsuarioNome>
                <UsuarioFuncao>
                  {usuario.Roles.map((role) => role.roleName).join(", ") ||
                    "Nenhum papel atribuído"}
                </UsuarioFuncao>
              </UsuarioItem>
            ))
          ) : (
            <li>Nenhum usuário encontrado.</li>
          )}
        </UsuarioLista>

        {modalAdcUsuario && (
          <FormAdcUsuario
            onClose={handleCloseModalAdcUsuario}
            onSave={handleSave}
          />
        )}
      </ContainerConteudo>
    </>
  );
};

export default AdcUsuarioAdmin;
