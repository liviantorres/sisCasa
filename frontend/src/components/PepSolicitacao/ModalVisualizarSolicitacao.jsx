import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineFileDownload } from "react-icons/md";
import { darken } from "polished";
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

const Button = styled.button`
  font-family: "Poppins", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  font-weight: 600;
  text-transform: uppercase;
  width: 30%;
  padding: 8px 15px;

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

const ModalVisualizarSolicitacao = ({ solicitacao, onClose }) => {
  const [remetente, setRemetente] = useState([]);
  const [curso, setCurso] = useState([]);

  const formatarData = (dataISO) => {
    const dataObj = new Date(dataISO);
    const opcoes = { day: "2-digit", month: "numeric", year: "numeric" };
    return dataObj.toLocaleDateString("pt-BR", opcoes);
  };

  const handleOpenCertificado = () => {
    if (solicitacao.certificado) {
      const baseURL = "https://scasa.ufc.br/api/";
      const certificadoURL = `${baseURL}${solicitacao.certificado.replace(
        /\\/g,
        "/"
      )}`;
      window.open(certificadoURL, "_blank");
    }
  };
  
  const fetchCurso = async () =>{
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`https://scasa.ufc.br/api/atividade/buscar/${solicitacao.cursoId}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }})
        console.log(response.data);
        setCurso(response.data);

    } catch (error) {
      console.log(error.message)
    }
  }

  const fetchRemetente = async () => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`https://scasa.ufc.br/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRemetente(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRemetente();
    fetchCurso();
  }, []);

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
              <P>{solicitacao.descricao || "Não informado"}</P>
            </Div>
            <Div>
              {solicitacao.tipoSolicitacao === "Certificado de Curso" && (
                <>
                  <Label>Curso:</Label>
                  <P>{curso.titulo} - {curso.cargaHoraria}h</P>
                </>
              )}
              <Label>Status:</Label>
              <ContainerStatus>
                <StatusDot status={solicitacao.status} />
                <P>{solicitacao.status}</P>
              </ContainerStatus>

              <Label>Tabela de pontos:</Label>
              <P>{solicitacao.atividadeTabela}</P>
            </Div>
            <Div>
              <Label>Remetente:</Label>
              <P>
              {remetente?.nomeCompleto || "Remetente não encontrado"} - 
              {remetente?.id === curso?.professorId ? " (Professor)" : " (Aluno)"}
            </P>
              <Label>Data:</Label>
              <P>{formatarData(solicitacao.data)}</P>
            </Div>
          </DivTop>
          <Div>
            <Label>Motivo (se rejeitado):</Label>
            <P>{solicitacao.motivo || "N/A"}</P>

            <Label>Certificado em PDF:</Label>

            {solicitacao.certificado ? (
              <Button cor="#774fd1" onClick={handleOpenCertificado}>
                <MdOutlineFileDownload size={25} /> Baixar Certificado
              </Button>
            ) : (
              <P>Nenhum certificado disponível.</P>
            )}
          </Div>
        </ContainerInputsLabels>
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalVisualizarSolicitacao;
