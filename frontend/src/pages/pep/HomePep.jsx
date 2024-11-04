import { styled } from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Atividade from "../../components/Atividade";
import ModalInscrever from "../../components/PepAtividades/ModalInscrever"

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

const ScrollableAtividades = styled.div`
  max-height: 500px;
  overflow-y: auto;
  padding-right: 20px;
`;

const SemAtividades = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  text-align: center;
  color: #202b3b;
`;

const HomePep = () => {
  const [atividades, setAtividades] = useState([]);
  const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
  const [modalInscrever, setModalInscrever] = useState(false)

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');

  const fetchAtividades = async () => {
   
    try {
      const response = await axios.get(`http://localhost:3000/atividade/${userId}/atividades-geral`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAtividades(response.data);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    }
  };

  useEffect(() => {
    fetchAtividades();
  }, []);

  const handleOpenModalInscrever = (atividade) =>{
    setAtividadeSelecionada(atividade);
    setModalInscrever(true);
  };

  const handleCloseModalInscrever = () =>{
    setModalInscrever(false)
  };
  
  const handleSave = async () =>{

    try {
      const response = axios.post(`http://localhost:3000/atividade/${atividadeSelecionada.id}/aluno/${userId}`,{
        headers: {
         Authorization: `Bearer ${token}`
        }
      })
      
      console.log("Usuário adicionado a atividade", response.data);
      setModalInscrever(false);
      alert("Inscrito na atividade!");
      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Header />
      <ContainerConteudo>
        <Titulo>Cursos Disponíveis </Titulo>

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
                    texto: "Inscrever-se",
                    cor: "#04D361",
                    onClick: () => handleOpenModalInscrever(atividade),
                  },
                ]}
              />
            ))
          ) : (
            <SemAtividades>
              Não há atividades disponíveis no momento.
            </SemAtividades>
          )}
        </ScrollableAtividades>

        {modalInscrever && <ModalInscrever atividade={atividadeSelecionada} onClose={handleCloseModalInscrever} onSave={handleSave}/>}
      </ContainerConteudo>
    </>
  );
};

export default HomePep;
