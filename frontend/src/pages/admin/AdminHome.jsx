import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Header from "../../components/Header";
import Atividade from "../../components/Atividade";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios"; 
import ModalAdicionar from "../../components/AdminAtividades/ModalAdicionar";
import ModalEditar from "../../components/AdminAtividades/ModalEditar";
import ModalRemover from "../../components/AdminAtividades/ModalRemover";
import ModalVisualizar from "../../components/AdminAtividades/ModalVisualizar";
import ModalFrequencia from "../../components/AdminAtividades/ModalFrequencia";
import ModalSelecionarTipo from "../../components/AdminAtividades/ModalSelecionarTipo";

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

const SemAtividades = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  text-align: center;
  color: #202b3b;
`

const AdminHome = () => {
  const [atividades, setAtividades] = useState([]); 
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalRemover, setModalRemover] = useState(false);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [modalFrequencia, setModalFrequenecia] = useState(false);
  const [professores, setProfessores] = useState([]);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  
  const [tipoAtividade, setTipoAtividade] = useState(null);
  const [modalSelecionarTipo, setModalSelecionarTipo] = useState(false);

  // Modal Adicionar Atividade
  const handleOpenModalAdicionar = () => {
    setModalSelecionarTipo(true); 
  };

  const handleCloseModalAdicionar = () => {
    setModalAdicionar(false);
  };

 
  const handleTipoSelecionado = (tipo) => {
    setTipoAtividade(tipo); 
    setModalSelecionarTipo(false); 
    setModalAdicionar(true); 
  };

  const handleCloseModalSelecionarTipo = () => {
    setModalSelecionarTipo(false); 
  };

  //Modal Editar
  const handleCloseModalEditar = () => {
    setModalEditar(false);
  };

  const handleOpenModalEditar = (atividade) => {
    setAtividadeSelecionada(atividade);
    setModalEditar(true);
  };

  //Modal Remover
  const handleCloseModalRemover = () => {
    setModalRemover(false);
  };

  const handleOpenModalRemover = (atividade) => {
    setAtividadeSelecionada(atividade);
    setModalRemover(true);
  };

  // Modal Visualizar
  const handleCloseModalVisualizar = () => {
    setModalVisualizar(false);
  };

  const handleOpenModalVisualizar = (atividade) => {
    setAtividadeSelecionada(atividade); 
    setModalVisualizar(true);
  };

  //Modal Frequencia
  const handleCloseModalFrequencia = () => {
    setModalFrequenecia(false);
  };

  const handleOpenModalFrequencia = (atividade) => {
    setAtividadeSelecionada(atividade);
    console.log("Atividade:" + atividade)
    setModalFrequenecia(true);
    setModalVisualizar(false);
  };

  const fetchProfessores = async () => {
    const token = localStorage.getItem('token'); 
    try {
      const response = await axios.get("http://localhost:3000/user/admin", {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      }); 
      setProfessores(response.data); 
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
    }
  };

  const fetchAtividades = async () => {
    const token = localStorage.getItem('token'); 
    try {
      const response = await axios.get("http://localhost:3000/atividade/", {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      }); 
      setAtividades(response.data); 
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    }
  };

  useEffect(() => {
    fetchAtividades(); 
    fetchProfessores();
  }, []);

  const handleSave = async (novaAtividade) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error("Token não encontrado");
      return;
    }
  
    try {
      console.log("Enviando nova atividade:", novaAtividade);
      const response = await axios.post("http://localhost:3000/atividade/criar", novaAtividade, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      console.log("Resposta da API:", response.data);
      setAtividades([...atividades, response.data]); 
      setModalAdicionar(false);
    } catch (error) {
      console.error("Erro ao adicionar atividade:", error);
    }
  };

  
  const handleUpdate = async (atividadeAtualizada) => {
    const token = localStorage.getItem('token');
    const { id } = atividadeSelecionada;
  
    if (!token) {
      console.error("Token não encontrado");
      return;
    }

    const updatedAtividade = {
      ...atividadeAtualizada,
      professorId: atividadeAtualizada.professorId === "" ? null : atividadeAtualizada.professorId,
      cargaHoraria: atividadeAtualizada.cargaHoraria === "" ? null : atividadeAtualizada.cargaHoraria,
    };
  
    try {
      const response = await axios.put(`http://localhost:3000/atividade/editar/${id}`, updatedAtividade, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      console.log("Resposta da API:", response.data);
      
      setAtividades(atividades.map((atividade) => 
        atividade.id === id ? response.data : atividade
      ));
      setModalEditar(false);
    } catch (error) {
      console.error("Erro ao atualizar atividade:", error);
    }
  };
  

  const handleRemove = async (atividadeSelecionada) => {
    const token = localStorage.getItem('token');
    const { id } = atividadeSelecionada;
  
    if (!token) {
      console.error("Token não encontrado");
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:3000/atividade/deletar/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      console.log("Resposta da API:", response.data);
  
      setAtividades(atividades.filter((atividade) => atividade.id !== id));
      setModalRemover(false);
    } catch (error) {
      console.error("Erro ao remover atividade:", error);
    }
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
          {Array.isArray(atividades) && atividades.length > 0 ? (
            atividades.map((atividade) => (
              <Atividade
                key={atividade.id}
                titulo={atividade.titulo}
                descricao={atividade.descricao}
                cargaHoraria={`${atividade.cargaHoraria}h`}
                botoes={[
                  {
                    texto: "Editar",
                    onClick: () => handleOpenModalEditar(atividade), 
                    cor: "#928AA2",
                  },
                  {
                    texto: "Remover",
                    onClick: () => handleOpenModalRemover(atividade),
                    cor: "#4B3E65",
                  },
                ]}
                onVisualizar={() => handleOpenModalVisualizar(atividade)}
              />
            ))
          ) : (
            <SemAtividades>Não há atividades disponíveis no momento.</SemAtividades>
          )}
        </ScrollableAtividades>

        {modalSelecionarTipo && (
          <ModalSelecionarTipo 
            onClose={handleCloseModalSelecionarTipo}
            onSelect={handleTipoSelecionado}
          />
        )}

        {modalAdicionar && <ModalAdicionar tipo={tipoAtividade}  onClose={handleCloseModalAdicionar} onSave={handleSave} professores={professores} />}
        {modalEditar && <ModalEditar professores={professores} atividade={atividadeSelecionada} onClose={handleCloseModalEditar} onSave={handleUpdate} />}
        {modalRemover && <ModalRemover atividade={atividadeSelecionada} onConfirm={handleRemove} onClose={handleCloseModalRemover} />}
        {modalVisualizar && (
          <ModalVisualizar atividade={atividadeSelecionada} onClose={handleCloseModalVisualizar} modalFrequencia={handleOpenModalFrequencia} />
        )}
        {modalFrequencia && <ModalFrequencia atividade={atividadeSelecionada} onClose={handleCloseModalFrequencia} />}
      </ContainerConteudo>
    </>
  );
};

export default AdminHome;
