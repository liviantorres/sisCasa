import { styled } from "styled-components";
import Header from "../../components/Header";
import Solicitacao from "../../components/AdminSolicitacoes/Solicitacao";
import { useEffect, useState } from "react";
import axios from "axios";

// Estilização do container do conteúdo
const ContainerConteudo = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
`;

// Estilização do título
const Titulo = styled.h2`
  font-family: "Archivo", sans-serif;
  font-weight: 300;
  font-size: 30px;
  color: #202b3b;
  margin-bottom: 40px;
`;

// Estilização do modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Estilização do conteúdo do modal
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

// Botão para fechar o modal
const CloseButton = styled.button`
  background-color: #774fd1;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #47248f;
  }
`;

const SolicitacoesPep = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [modalSolicitacao, setModalSolicitacao] = useState(null); // Armazena a solicitação atual para o modal

  const fetchSolicitacoes = async () => {
    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('id');
    try {
      const response = await axios.get(`http://localhost:3000/solicitacao/${userId}/usuario`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      setSolicitacoes(response.data); 
    } catch (error) {
      console.error("Erro ao buscar solicitacoes", error);
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  // Função para abrir o modal com a solicitação selecionada
  const openModal = (solicitacao) => {
    setModalSolicitacao(solicitacao);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalSolicitacao(null);
  };

  return (
    <>
      <Header />
      <ContainerConteudo>
        <Titulo>Suas Solicitações</Titulo>

        {solicitacoes.map((solicitacao, index) => (
          <Solicitacao 
            key={index} 
            solicitacao={solicitacao} 
            onDetalhes={() => openModal(solicitacao)} // Passa a função para abrir o modal
          />
        ))}

        {/* Exibir modal se houver uma solicitação selecionada */}
        {modalSolicitacao && (
          <ModalOverlay>
            <ModalContent>
              <h2>Detalhes da Solicitação</h2>
              <p><strong>Título:</strong> {modalSolicitacao.titulo}</p>
              <p><strong>Professor:</strong> {modalSolicitacao.professor}</p>
              <p><strong>Status:</strong> {modalSolicitacao.status}</p>
              <p><strong>Data:</strong> {modalSolicitacao.data}</p>
              {/* Adicione mais detalhes conforme necessário */}
              <CloseButton onClick={closeModal}>Fechar</CloseButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </ContainerConteudo>
    </>
  );
};

export default SolicitacoesPep;
