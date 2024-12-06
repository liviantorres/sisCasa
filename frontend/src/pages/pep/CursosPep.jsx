import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { MdOutlineDone } from "react-icons/md";
import Atividade from "../../components/Atividade";
import axios from "axios";
import ModalFrequencia from "../../components/PepAtividades/ModalFrequencia";
import ModalVisualizar from "../../components/PepAtividades/ModalVisualizar";
import ModalVisualizarAtividade from "../../components/AdminAtividades/ModalVisualizar";

const ContainerConteudo = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 25px;
  background-color: #ccc;
  width: 200px;
  height: 40px;
  margin-bottom: 10px;
  position: relative;
`;

const ToggleOption = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => (props.ativo ? "#ffffff" : "#666")};
  cursor: pointer;
  z-index: 1;
`;

const ToggleIndicator = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => (props.conteudoAtual === "aluno" ? "0%" : "50%")};
  width: 50%;
  height: 100%;
  background-color: #4b3c8e;
  border-radius: 25px;
  transition: left 0.3s ease;
`;

const Text = styled.p`
  font-family: "Archivo", sans-serif;
  font-weight: 300;
  font-size: 14px;
  color: #666;
`;

const Titulo = styled.h2`
  font-family: "Archivo", sans-serif;
  font-weight: 300;
  font-size: 30px;
  color: #202b3b;
  margin-bottom: 40px;
`;

const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const ContainerBotao = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0px;
`;

const ScrollableAtividades = styled.div`
  max-height: 500px;
  overflow-y: auto;
  padding-right: 20px;
  width: 100%;
`;

const SemAtividades = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  text-align: center;
  color: #202b3b;
`;

const CursosPep = () => {
  const [conteudoAtual, setConteudoAtual] = useState("aluno");
  const [atividadesAluno, setAtividadesAluno] = useState([]);
  const [atividadesProfessor, setAtividadesProfessor] = useState([]);
  const [modalFrequencia, setModalFrequencia] = useState(null);
  const [modalVisualizar, setModalVisualizar] = useState(null);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  const [modalVisualizarAtividade, setModalVisualizarAtividade] = useState();

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const botao = [
    {
      texto: "Visualizar",
      cor: "#04D361",
      onClick: () => handleOpenModalFrequencia(atividade)
    },
  ];

  const fetchAtividades = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/atividade/${id}/atividades`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setAtividadesAluno(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchAtividadesProfessor = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/atividade/${id}/atividades-professor`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAtividadesProfessor(response.data);
      console.log(atividadesProfessor);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchAtividades();
    fetchAtividadesProfessor();
  }, []);

  const handleOpenModalFrequencia = (atividade) => {
    setAtividadeSelecionada(atividade);
    setModalFrequencia(true);
  };

  const handleCloseModalFrequencia = () => {
      setModalFrequencia(false)
  };

  const handleOpenModalVisualizar = (atividade) => {
    setAtividadeSelecionada(atividade);
    setModalVisualizar(true);
  };

  const handleCloseModalVisualizar = () => {
    setModalVisualizar(false)
  };

  
  const handleOpenModalVisualizarAtividade = (atividade) => {
    setAtividadeSelecionada(atividade);
    setModalVisualizarAtividade(true);
  };

  const handleCloseModalVisualizarAtividade = () => {
    setModalVisualizarAtividade(false)
  };

  return (
    <>
      <Header />
      <ContainerConteudo>
        <ContainerHeader>
          <Titulo>Suas Atividades</Titulo>
          <ContainerBotao>
            <ToggleContainer>
              <ToggleIndicator conteudoAtual={conteudoAtual} />
              <ToggleOption
                ativo={conteudoAtual === "aluno"}
                onClick={() => setConteudoAtual("aluno")}
              >
                {conteudoAtual === "aluno" && <MdOutlineDone size={18} />}
                Aluno
              </ToggleOption>
              <ToggleOption
                ativo={conteudoAtual === "professor"}
                onClick={() => setConteudoAtual("professor")}
              >
                {conteudoAtual === "professor" && <MdOutlineDone size={18} />}
                Professor
              </ToggleOption>
            </ToggleContainer>
            <Text>
              Mude para {conteudoAtual === "aluno" ? "professor" : "aluno"}
            </Text>
          </ContainerBotao>
        </ContainerHeader>
        <ScrollableAtividades>
          {conteudoAtual === "aluno" ? (
            Array.isArray(atividadesAluno) && atividadesAluno.length > 0 ? (
              atividadesAluno.map((atividade) => (
                <Atividade
                  key={atividade.id}
                  titulo={atividade.titulo}
                  descricao={atividade.descricao}
                  cargaHoraria={`${atividade.cargaHoraria}h`}
                  situacao={atividade.situacao}
                  botoes={[
                    {
                      texto: "Visualizar",
                      cor: "#04D361",
                      onClick: () => handleOpenModalVisualizarAtividade(atividade)
                    },
                  ]}
                />
              ))
            ) : (
              <SemAtividades>
                Não há atividades disponíveis no momento.
              </SemAtividades>
            )
          ) : (
            Array.isArray(atividadesProfessor) && atividadesProfessor.length > 0 ? (
              atividadesProfessor.map((atividade)=>(
                <Atividade
                key={atividade.id}
                titulo={atividade.titulo}
                descricao={atividade.descricao}
                botoes={[
                  {
                    texto: "Frequencia",
                    cor: "#47248F",
                    onClick: () => handleOpenModalFrequencia(atividade)
                  },
                  {
                    texto: "Visualizar",
                    cor: "#47248F",
                    onClick: () => handleOpenModalVisualizar(atividade)
                  },
                ]}
              />
              ))
            ) : (
              <SemAtividades>
              Não há atividades disponíveis no momento.
             </SemAtividades>
            )
           
          )}
        </ScrollableAtividades>
        {modalFrequencia && <ModalFrequencia atividade={atividadeSelecionada} onClose={handleCloseModalFrequencia}></ModalFrequencia>}
        {modalVisualizar && <ModalVisualizar atividade={atividadeSelecionada}  alunos={atividadeSelecionada.Users} onClose={handleCloseModalVisualizar}></ModalVisualizar>}
        {modalVisualizarAtividade && <ModalVisualizarAtividade atividade={atividadeSelecionada}  alunos={atividadeSelecionada.Users} onClose={handleCloseModalVisualizarAtividade}></ModalVisualizarAtividade>}
      </ContainerConteudo>
    </>
  );
};

export default CursosPep;
