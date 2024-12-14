import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { darken } from "polished";
import Swal from "sweetalert2";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";

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
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 50%;
  z-index: 1000;
`;

const CloseIcon = styled(AiOutlineClose)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
  &:hover {
    color: #5a3cae;
  }
`;

const ContainerInputsLabels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
  background-color: #f5f5f9;
  border-radius: 8px;
  padding: 20px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: "Poppins", sans-serif;
  font-weight: 550;
  text-transform: uppercase;

  color: #774fd1;
  margin: 12px 0px 12px 0px;
`;

const TextArea = styled.textarea`
  font-family: "Archivo", sans-serif;
  font-weight: 400;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px;
  resize: vertical;
  min-height: 80px;

  &:focus {
    border-color: #774fd1;
    outline: none;
    box-shadow: 0 0 4px rgba(119, 79, 209, 0.7);
  }
`;

const Button = styled.button`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  width: 25%;
  padding: 8px 0px;

  background-color: ${({ cor }) => cor || "#1eb662"};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: ${({ cor }) => (cor ? darken(0.1, cor) : "#1eb662")};
    transform: translateY(-2px);
    box-shadow: 0px 4px 8px rgba(30, 182, 98, 0.3);
  }
`;

const ContainerBotoes = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const Header = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 20px;
  text-align: center;
  color: #ffffff;
  background-color: #774fd1;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  text-transform: uppercase;
`;

const ContainerStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ status }) => {
    switch (status) {
      case "Pendente":
        return "yellow";
      case "Rejeitado":
        return "red";
      case "Aceito":
        return "green";
      default:
        return "gray";
    }
  }};
`;

const DivTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 100px;
`;

const P = styled.p`
  font-family: "Archivo", sans-serif;
  margin-left: 5px;
`;

const ModalCertificadoHoras = ({ solicitacao, onClose, onStatusChange }) => {
  const [categorias, setCategorias] = useState([]);
  const [nomeRemetente, setNomeRemetente] = useState("");
  const [remetenteId, setIdRemetente] = useState("");
  const [motivo, setMotivo] = useState("");
  const [horas, setHoras] = useState();
  const [horasConsideradas, setHorasConsideradas] = useState();
  const [pontuacao, setPontuacao] = useState();

  const token = localStorage.getItem("token");

  const handleAccept = async () => {
    if (!horasConsideradas) {
      Swal.fire({
        icon: "warning",
        title: "Horas a contabilizar",
        text: "Para aceitar, é necessário preencher a quantidade de horas.",
        confirmButtonColor: "#774fd1",
        customClass: {
          popup: "custom-swal-font",
        },
      });
      return;
    }

    const horasData = {
      userId: solicitacao.usuarioId,
      codigo: String(solicitacao.atividadeTabela),
      horasSubmetidas: horasConsideradas,
      horasConsideradas: horasConsideradas,
    };

    await axios.put(`http://localhost:3000/pontuacao/`, horasData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const formData = new FormData();
    formData.append("status", "Aceito");

    try {
      const response = await axios.put(
        `http://localhost:3000/solicitacao/${solicitacao.id}/status`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Solicitação Aceita",
        text: "A solicitação foi aceita e as horas contabilizadas.",
        confirmButtonColor: "#774fd1",
        customClass: {
          popup: "custom-swal-font",
        },
      }).then(() => {
        onStatusChange("Aceito");
        onClose();
      });
    } catch (error) {
      console.error("Erro no PUT:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Erro ao Aceitar",
        text: "Ocorreu um erro ao aceitar a solicitação.",
        confirmButtonColor: "#774fd1",
        customClass: {
          popup: "custom-swal-font",
        },
      });
    }
  };

  const handleReject = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    if (!motivo.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Motivo obrigatório",
        text: "Por favor, forneça um motivo para rejeitar a solicitação.",
        confirmButtonColor: "#774fd1",
        customClass: {
          popup: "custom-swal-font",
        },
      });
      return;
    }

    formData.append("status", "Rejeitado");
    formData.append("motivo", motivo);

    try {
      const response = await axios.put(
        `http://localhost:3000/solicitacao/${solicitacao.id}/status`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Solicitação Rejeitada",
          text: "A solicitação foi rejeitada.",
          confirmButtonColor: "#774fd1",
          customClass: {
            popup: "custom-swal-font",
          },
        }).then(() => {
          onStatusChange("Rejeitado");
          onClose();
        });
      } else {
        throw new Error("Erro ao rejeitar a solicitação.");
      }
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: "error",
        title: "Erro ao Rejeitar",
        text: "Ocorreu um erro ao rejeitar a solicitação.",
        confirmButtonColor: "#774fd1",
        customClass: {
          popup: "custom-swal-font",
        },
      });
    }
  };

  const handleOpenComprovante = () => {
    if (solicitacao.comprovante) {
      const baseURL = "http://localhost:3000/";
      const comprovanteURL = `${baseURL}${solicitacao.comprovante.replace(
        /\\/g,
        "/"
      )}`;
      window.open(comprovanteURL, "_blank");
    }
  };

  const fetchAtividadesDaTabela = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categorias", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(response.data)) {
        setCategorias(response.data);
      } else {
        console.error("Formato inesperado:", response.data);
      }
    } catch (error) {
      console.log("Erro ao buscar categorias:", error.message);
    }
  };

  const fetchBuscarRemetente = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/${solicitacao.usuarioId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIdRemetente(response.data.id);
      setNomeRemetente(response.data.nomeCompleto);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchBuscarRemetente();
    fetchAtividadesDaTabela();
  }, []);

  const formatarData = (dataISO) => {
    const dataObj = new Date(dataISO);
    const opcoes = { day: "2-digit", month: "numeric", year: "numeric" };
    return dataObj.toLocaleDateString("pt-BR", opcoes);
  };

  return (
    <Overlay>
      <ContainerAdc>
        <Header>Detalhes da Solicitação</Header>
        <CloseIcon onClick={onClose} />
        <ContainerInputsLabels>
          <DivTop>
            <Div>
              <Label>Tipo de Solicitação:</Label>
              <P>{solicitacao.tipoSolicitacao}</P>

              <Label>Descrição:</Label>
              {solicitacao.descricao ? (
                <>
                  <P>{solicitacao.descricao}</P>
                </>
              ) : (
                <P>Descrição não fornecida</P>
              )}

              <Label>Comprovante:</Label>
              {solicitacao.comprovante ? (
                <a
                  href="#"
                  onClick={handleOpenComprovante}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#000000ab",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "500",
                  }}
                >
                  Visualizar Comprovante
                </a>
              ) : (
                <P>Nenhum comprovante disponível</P>
              )}
            </Div>
            <Div>
              <Label>Status:</Label>
              <ContainerStatus>
                <StatusDot status={solicitacao.status} />
                <P>{solicitacao.status}</P>
              </ContainerStatus>
              <Label>tabela de pontos:</Label>
              <P>{solicitacao.atividadeTabela}</P>

              <Label>Horas consideradas:</Label>
              <input
                value={horasConsideradas}
                onChange={(e) => setHorasConsideradas(e.target.value)}
                type="number"
              />
            </Div>
            <Div>
              <Label>Remetente:</Label>
              <P>{nomeRemetente}</P>
              <Label>Data:</Label>
              <P>{formatarData(solicitacao.data)}</P>
            </Div>
          </DivTop>

          <Div>
            <Label>Motivo (se rejeitado):</Label>
            <TextArea
              placeholder="Explique o motivo da rejeição (opcional)"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </Div>
        </ContainerInputsLabels>
        <ContainerBotoes>
          <Button cor="#4caf50" onClick={handleAccept}>
            Aceitar
          </Button>
          <Button cor="#C02929" onClick={handleReject}>
            Rejeitar
          </Button>
        </ContainerBotoes>
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalCertificadoHoras;
