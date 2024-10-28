import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { MdOutlineDone } from "react-icons/md";
import Atividade from "../../components/Atividade";

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

const CursosPep = () => {
  const [conteudoAtual, setConteudoAtual] = useState("aluno");

  const botao = [
    {
      texto: "Anexar Comprovante",
      cor: "#04D361",
    },
  ];

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
            <Atividade
              titulo="Atividade teste"
              descricao="descricao da atividade teste"
              cargaHoraria="2"
              situacao="Aprovado"
              botoes={botao}
            />
          ) : (
            <Atividade
              titulo="Atividade de professor"
              descricao="descricao da atividade de professor"
              botoes={[
                {
                    texto: "Frequencia",
                    cor: "#47248F",
                },
                {
                    texto: "Visualizar",
                    cor: "#47248F",
                }
              ]}
            />
          )}
        </ScrollableAtividades>
      </ContainerConteudo>
    </>
  );
};

export default CursosPep;
