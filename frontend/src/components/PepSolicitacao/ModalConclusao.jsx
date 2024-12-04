import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
  padding: 0px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%;
  z-index: 1000;
  position: relative;
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 24px;
  cursor: pointer;
  color: #fff;
  margin-top: -20px;
  &:hover {
    color: #5a3cae;
  }
`;

const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  width: 25%;
  padding: 8px 0px;
  background-color: #1eb662;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: #168e4e;
    transform: translateY(-2px);
    box-shadow: 0px 4px 8px rgba(30, 182, 98, 0.3);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #774fd1;
  border-radius: 8px 8px 0 0;
`;

const Header = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: #fff;
  letter-spacing: 0.9px;
  font-size: 20px;
  flex: 1;
  text-align: center;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px;
`;

const Alert = styled.div`
  color: #ed2c2c;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
`;

const ModalConclusao = ({ onClose }) => {
  const [user, setUser] = useState();
  const [isDisabled, setIsDisabled] = useState(true); // To disable the "Enviar" button initially
  const [showAlert, setShowAlert] = useState(false); // To show alert when hours are less than 128

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const fetchUsuario = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  useEffect(() => {
    if (user && user.horasConcluidas >= 128) {
      setIsDisabled(false); 
      setShowAlert(false); 
    }
  }, [user]);

  const handleSubmit = async () => {
    if (user.horasConcluidas < 128) {
      setShowAlert(true);
    } else {
      try {
        const usuarioId = localStorage.getItem("id");

        const novaSolicitacao = {
          usuarioId: usuarioId,
          tipoSolicitacao: "Certificado de Horas",
        };
        
        const response = await axios.post(
          `http://localhost:3000/solicitacao/`,
          novaSolicitacao,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Solicitação salva com sucesso:", response.data);
        Swal.fire({
          icon: "success",
          title: "Solicitação Enviada",
          text: "A solicitação foi enviada, aguarde a resposta.",
          confirmButtonColor: "#774fd1",
          customClass: {
            popup: "custom-swal-font",
          },
        }).then(() => {
          onClose(); 
          window.location.reload()
        });
      } catch (error) {
        console.log("Erro ao salvar solicitação:", error.message);
        Swal.fire({
          icon: "error",
          title: "Erro ao Enviar",
          text: "Ocorreu um erro ao enviar a solicitação.",
          confirmButtonColor: "#774fd1",
          customClass: {
            popup: "custom-swal-font",
          },
        });
      }
    }
  };

  return (
    <Overlay>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <HeaderContainer>
          <Header>Solicitação de Conclusão:</Header>
          <CloseIcon onClick={onClose} />
        </HeaderContainer>
        <Div>
          <p>Horas Concluídas: {user ? user.horasConcluidas : 0} / 128</p>
          {showAlert && (
            <Alert>Você precisa concluir pelo menos 128 horas para enviar a solicitação.</Alert>
          )}
        </Div>
        <ContainerBotoes>
          <Button onClick={handleSubmit} disabled={isDisabled}>
            Enviar
          </Button>
        </ContainerBotoes>
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalConclusao;
