import Header from "../../components/Header";
import styled from "styled-components";
import Solicitacao from "../../components/AdminSolicitacoes/Solicitacao";
import { useState, useEffect } from "react";
import axios from "axios";

const Titulo = styled.h2`
  font-family: "Archivo", sans-serif;
  font-weight: 300;
  font-size: 30px;
  color: #202b3b;
  margin-bottom: 40px;
`;

const ContainerConteudo = styled.div`
    margin: 50px;
    display: flex;
    flex-direction: column;
  `;


const ScrollableAtividades = styled.div`
max-height: 500px;
overflow-y: auto;
padding-right: 20px;
`;

const SolicitacoesAdmin = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);

    const exemploSolicitacao = {
        titulo: "Aprendizado de React",
        professor: "Prof. João Silva",
        data: "23/09/2024",
        status: "aceito"
    };

    const fetchSolicitacoes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:3000/solicitacao/`,
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



  return (
    <>
      <Header />
      <ContainerConteudo>
        <Titulo>Solicitações Recebidas</Titulo>
        
        <ScrollableAtividades>
          {solicitacoes.map((solicitacao, index) => (
            <Solicitacao
              key={index}
              solicitacao={solicitacao}
           
            />
          ))}
          <Solicitacao
            solicitacao={{
              status: "pendente",
              tipoSolicitacao: "Contabilizar Horas",
              descricao: "Teste de Solicitacao",
            }}
          />
        </ScrollableAtividades>
      </ContainerConteudo>
    </>
  );
};

export default SolicitacoesAdmin;
