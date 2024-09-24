import { styled } from "styled-components";
import Header from "../components/Header";
import Atividade from "../components/Atividade";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import ModalAdicionar from "../components/AdminAtividades/ModalAdicionar"
import ModalEditar from "../components/AdminAtividades/ModalEditar";
import ModalRemover from "../components/AdminAtividades/ModalRemover";
import ModalVisualizar from "../components/AdminAtividades/ModalVisualizar"
import ModalFrequencia from "../components/AdminAtividades/ModalFrequencia"


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
    background-color: #774FD1;
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

const AdminHome = () => {
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalRemover, setModalRemover] = useState(false);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [modalFrequencia, setModalFrequenecia] = useState(false);

  // Modal Adicionar Atividade
  const handleOpenModalAdicionar = () => {
    setModalAdicionar(true);
  };

  const handleCloseModalAdicionar = () => {
    setModalAdicionar(false);
  };

  //Modal Editar
  const handleCloseModalEditar = () => {
    setModalEditar(false);
  }

  const handleOpenModalEditar = () => {
    setModalEditar(true);
  }

  //Modal Remover
  const handleCloseModalRemover = () => {
    setModalRemover(false);
  }

  const handleOpenModalRemover = () => {
    setModalRemover(true);
  }

  // Modal Visualizar
  const handleCloseModalVisualizar = () => {
    setModalVisualizar(false);
  }

  const handleOpenModalVisualizar = () =>{
    setModalVisualizar(true);
  }

  //Modal Frequencia
  const handleCloseModalFrequencia = () => {
    setModalFrequenecia(false)
    
  }
  const handleOpenModalFrequencia = () => {
    setModalFrequenecia(true)
    setModalVisualizar(false)
  }

  //Atividade teste
  const atividade = {
    titulo: "Aula de Introdução à Programação",
    descricao: "Descrição detalhada da atividade.",
    cargaHoraria: "4 horas",
    professor: "Professor X",
    link: "https://linkdaatividade.com",
  };

  
  return (
    <>
      <Header />
      <ContainerConteudo>
        <Div>
          <Titulo>Atividades Adicionadas</Titulo>
          <Botao onClick={handleOpenModalAdicionar}>
            <IoMdAddCircleOutline size={18} /> Adicionar Atividades
          </Botao>
        </Div>

        <ScrollableAtividades>
          <Atividade
            titulo="Atividade de Desenvolvimento Web"
            descricao="Este Atividade cobre todos os aspectos do desenvolvimento web moderno, incluindo HTML, CSS, JavaScript e frameworks populares."
            cargaHoraria="40h"
            botoes={[
              {
                texto: "Editar",
                onClick: () => handleOpenModalEditar(),
                cor: "#928AA2",
              },
              {
                texto: "Remover",
                onClick: handleOpenModalRemover,
                cor: "#4B3E65",
              },
            ]}
            onVisualizar={handleOpenModalVisualizar}
           
          />
          <Atividade
            titulo="Atividade de Interação Humano-Computador"
            descricao="O Atividade de Interação Humano-Computador (IHC) aborda os princípios e práticas que melhoram a interação entre pessoas e sistemas digitais. Os alunos aprenderão a criar interfaces que sejam intuitivas, acessíveis e eficazes."
            cargaHoraria="40h"
            botoes={[
              {
                texto: "Editar",
                onClick: handleOpenModalEditar,
              },
              {
                texto: "Remover",
                onClick: handleOpenModalRemover,
              },
            ]}
            onVisualizar={handleOpenModalVisualizar}
            
          />
          <Atividade
            titulo="Atividade de Design de Interfaces"
            descricao="O Atividade ensina os princípios de design de interfaces, usabilidade e experiência do usuário (UX), com foco em práticas centradas no usuário."
            cargaHoraria="40h"
            botoes={[
              {
                texto: "Editar",
                onClick: handleOpenModalEditar,
              },
              {
                texto: "Remover",
                onClick: handleOpenModalRemover,
              },
            ]}
            onVisualizar={handleOpenModalVisualizar}
          />
        </ScrollableAtividades>

        {modalAdicionar && (
        <ModalAdicionar onClose={handleCloseModalAdicionar}/>
        )}

        {modalEditar && (
            <ModalEditar onClose={handleCloseModalEditar}/>
        )}

        {modalRemover && (
            <ModalRemover onClose={handleCloseModalRemover}/>
        )}

        {modalVisualizar && (
            <ModalVisualizar atividade={atividade} onClose={handleCloseModalVisualizar} modalFrequencia={handleOpenModalFrequencia}/>
        )}
        {modalFrequencia && (
            <ModalFrequencia onClose={handleCloseModalFrequencia}/>
        )}


      </ContainerConteudo>
    </>
  );
};

export default AdminHome;

