import { styled } from "styled-components";
import Header from "../../components/Header";
import Solicitacao from "../../components/PepSolicitacao/Solicitacao";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAddCircleOutline } from "react-icons/io";
import ModalAtividade from "../../components/ServidorSolicitacoes/ModalAtividade";

const ContainerConteudo = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
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
  font-family: "Arquivo", sans-serif;
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
    background-color: "#774FD1";
    transform: scale(1.05);
  }
`;

const ScrollableAtividades = styled.div`
  max-height: 500px;
  overflow-y: auto;
  padding-right: 20px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MensagemNenhumaSolicitacao = styled.div`
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  color: #888;
  margin-top: 20px;
  padding: 10px;
`;

const SolicitacoesServidor = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [modalSolicitacao, setModalSolicitacao] = useState(null);
  const [modalAdcSolicitacao, setModalAdcSolicitacao] = useState(null);
  const [modalAtividade, setModalAtividade] = useState(null);

  const addSolicitacao = (novaSolicitacao) => {
    setSolicitacoes((prevSolicitacoes) => [novaSolicitacao, ...prevSolicitacoes]);
  };

  const fetchSolicitacoes = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    try {
      const response = await axios.get(
        `https://scasa.ufc.br/api/solicitacao/${userId}/usuario`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSolicitacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar solicitacoes", error);
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  const openModal = () => {
    setModalSolicitacao(true);
  };

  const openModalAtividade = () => {
    setModalAdcSolicitacao(false);
    setModalAtividade(true);
  };

  const closeModalAtividade = () => {
    setModalAtividade(false);
  };


  return (
    <>
      <Header />
      <ContainerConteudo>
        <Div>
          <Titulo>Suas Solicitações</Titulo>
          <Botao onClick={openModalAtividade}>
            <IoMdAddCircleOutline size={18} /> Adicionar Solicitação
          </Botao>
        </Div>

        <ScrollableAtividades>
          {solicitacoes.length > 0 ? (
            solicitacoes.map((solicitacao, index) => (
              <Solicitacao
                key={index}
                solicitacao={solicitacao}
                onDetalhes={() => openModal(solicitacao)}
              />
            ))
          ) : (
            <MensagemNenhumaSolicitacao>
              Nenhuma solicitação encontrada.
            </MensagemNenhumaSolicitacao>
          )}
        </ScrollableAtividades>

        
        {modalAtividade && <ModalAtividade onClose={closeModalAtividade} onAddSolicitacao={addSolicitacao} />}
        
      </ContainerConteudo>
    </>
  );
};

export default SolicitacoesServidor;
