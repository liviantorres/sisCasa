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

const P = styled.p`
  font-family: "Archivo", sans-serif;
  margin-left: 5px;
`;

// Barra de Progresso
const ProgressBar = styled.div`
  width: 90%;
  background-color: #ddd;
  border-radius: 20px;
  margin: 20px 0;
  height: 20px;
  overflow: hidden;
  margin-top: 5px;
`;

const Progresso = styled.h3`
  font-family: "Archivo", sans-serif;
  margin-bottom: 20px;
  & h4 {
    margin-top: 10px;
    color: #774fd1;
  }
`;

const Progress = styled.div`
  width: ${({ percentage }) => percentage}%;
  background-color: #774fd1;
  height: 100%;
  transition: width 0.3s ease;
`;

const Label = styled.label`
  font-family: "Poppins", sans-serif;
  span {
    color: #ed2c2c;
  }
`;



const Textarea = styled.textarea`
  font-family: "Archivo", sans-serif;
  font-weight: 100;
  font-size: 12px;
  width: 90%;
  height: 80px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
  background-color: #f2eeee;

  &::placeholder {
    color: #999;
    font-family: "Archivo", sans-serif;
    font-weight: 100;
    font-size: 13px;
  }

  &:focus {
    border-color: #774fd1;
    outline: none;
    box-shadow: 0 0 2px rgba(119, 79, 209, 0.7);
  }
`;


const ModalConclusao = ({ onClose, onAddSolicitacao }) => {
  const [user, setUser] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [descricao, setDescricao] = useState();

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const fetchUsuario = async () => {
    try {
      const response = await axios.get(`http://200.129.40.161:3000/user/${id}`, {
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
    if (user && user.horasConcluidas >= 128) {
      setIsDisabled(false);
      
    }
  }, [user]);

  const handleSubmit = async () => {
   
      try {
        const usuarioId = localStorage.getItem("id");

        const novaSolicitacao = {
          usuarioId: usuarioId,
          tipoSolicitacao: "Certificado de Horas",
          descricao: descricao
        };

        const response = await axios.post(
          `http://200.129.40.161:3000/solicitacao/`,
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
          onAddSolicitacao(response.data);
          onClose();
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
    
  };

  return (
    <Overlay>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <HeaderContainer>
          <Header>Solicitação de Conclusão:</Header>
          <CloseIcon onClick={onClose} />
        </HeaderContainer>
        <Div>
          <Progresso>
            Horas Concluídas: <h4>{user?.horasConcluidas || 0} / 128 horas</h4>
          </Progresso>
          <ProgressBar>
            <Progress
              percentage={user ? (user.horasConcluidas / 128) * 100 : 0}
            />
          </ProgressBar>

          <Label>Adicione uma breve descrição (opcional)</Label>
          <Textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
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
