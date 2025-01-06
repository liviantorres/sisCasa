import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Header from "../../components/Header";
import axios from "axios";
import TabelaDePontos from '../../components/AdminTabela/TabelaDePontos.jsx'; 
import { IoMdAddCircleOutline } from "react-icons/io";

const ContainerConteudo = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

const Titulo = styled.h2`
  font-family: "Archivo", sans-serif;
  font-weight: 300;
  font-size: 30px;
  color: #202b3b;
`;

const ContainerInfoStyled = styled.div`
  font-family: "Archivo", sans-serif;
  background-color: #D3CEDE;
  color: #000;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const TitleStyled = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  margin: 0 0 10px;
`;

const AlertStyled = styled.p`
  font-size: 1em;
  font-weight: bold;
  margin: 0 0 10px;
`;

const DescriptionStyled = styled.p`
  font-size: 1em;
  margin: 0;
`;

const TableStyled = styled.table`
  font-family: "Archivo", sans-serif;
  width: 100%;
  border-collapse: collapse;
  background-color: #D3CEDE;
  color: #000;
  text-align: center;
  margin-top: 20px;
`;

const CategoryTitleStyled = styled.th`
  height: 50px;
  width: 15px;
`;
const ThStyled = styled.th`
font-weight: 400;
  padding: 10px;
  text-align: left;
  border: 1px solid white;
`;

const MenuStyled = styled.div`
  display: flex;
  justify-content: space-between; /* Isso vai colocar os itens na mesma linha */
  align-items: center; /* Para alinhar verticalmente os itens */
  margin-bottom: 20px; /* Adiciona um espaço inferior */
  
  .dropdown {
    display: flex;
    position: relative;
    display: inline-block;
  }

  .dropbtn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    background-color: #5b5b5b;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    gap: 8px;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 100px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown-content a {
    color: black;
    font-size: 15px;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {
    background-color: #ddd;
  }
`;

const ScrollableAtividades = styled.div`
  margin-top: 4px;
  max-height: 355px;
  overflow-y: auto;
  padding-right: 20px;
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
  width: 15%;
  gap: 4px;
  height: 3rem;
  border-radius: 8px;
  border: none;
  background-color: #774FD1;
  text-transform: uppercase;
  letter-spacing: 0.75px;
  color: #ffffff;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    background-color: "#774FD1";
    transform: scale(1.05);
  }
`;

const TabelaDePontosAdmin = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [participacao, setParticipacao] = useState([]);
  const [isTabelaDePontosOpen, setIsTabelaDePontosOpen] = useState(false);
  const [file, setFile] = useState(null); 
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const fetchCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categorias", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  const fetchParticipacoes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/pontuacao/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setParticipacao(response.data);
    } catch (error) {
      console.error("Erro ao buscar participações:", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
    fetchParticipacoes();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleCsvUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post(
          "http://localhost:3000/pontuacao/atualizarTabela",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Dados atualizados com sucesso!");
  
        // Recarregar as categorias e participações após o upload
        fetchCategorias();
        fetchParticipacoes();
  
        setIsTabelaDePontosOpen(false); // Fechar o modal após o upload
        setFile(null); // Limpar o arquivo selecionado
      } catch (error) {
        console.error(
          "Erro ao enviar dados para o backend:",
          error.response?.data || error.message
        );
        alert("Erro ao atualizar dados.");
      }
    } else {
      console.error("Nenhum arquivo selecionado.");
    }
  };

  const renderCategoryTitle = () => {
    const selectedCategoryData = categorias.find(
      (category) => category.nome === selectedCategory
    );

    if (selectedCategoryData) {
      return (
        <CategoryTitleStyled colSpan="6">
          {`CATEGORIA ${selectedCategoryData.nome} - ${selectedCategoryData.descricao}`}
        </CategoryTitleStyled>
      );
    }

    return (
      <CategoryTitleStyled colSpan="6">
        Selecione uma categoria
      </CategoryTitleStyled>
    );
  };

  const renderTableContent = () => {
    if (!categorias.length) {
      return (
        <tr>
          <td colSpan="6">Carregando categorias...</td>
        </tr>
      );
    }

    const selectedCategoryData = categorias.find(
      (category) => category.nome === selectedCategory
    );

    if (!selectedCategoryData) {
      return (
        <tr>
          <td colSpan="6">Categoria não encontrada.</td>
        </tr>
      );
    }

    return selectedCategoryData.atividades.map((atividade) => {
      const participacaoUsuario = participacao.find(
        (p) => p.atividadeTabelaId === atividade.id
      );

      return (
        <tr key={atividade.id}>
          <ThStyled>{atividade.codigo}</ThStyled>
          <ThStyled>{atividade.nome}</ThStyled>
          <ThStyled>{atividade.metrica}</ThStyled>
          <ThStyled>{atividade.teto_autorizado}</ThStyled>
          <ThStyled>
            {participacaoUsuario ? participacaoUsuario.horasSubmetidas : "N/A"}
          </ThStyled>
          <ThStyled>
            {participacaoUsuario
              ? participacaoUsuario.horasConsideradas
              : "N/A"}
          </ThStyled>
        </tr>
      );
    });
  };

  return (
    <>
      <Header />
      <ContainerConteudo>
        <Titulo>Tabela de Pontos</Titulo>
      </ContainerConteudo>

      <ContainerInfoStyled>
        <TitleStyled>
          Barema CASa (Tabela de pontuação no Programa de Formação Docente)
        </TitleStyled>
        <AlertStyled>
          Atenção: O docente deve cumprir atividades em, pelo menos, três das
          categorias abaixo.
        </AlertStyled>
        <DescriptionStyled>
          Serão cumpridas 128 horas de atividades formativas sendo,
          obrigatoriamente, 64 horas em atividades na CATEGORIA I e no máximo 64
          horas de atividades em, pelo menos, duas das demais CATEGORIAS II,
          III, IV (Ensino, Pesquisa, Extensão e Gestão).
        </DescriptionStyled>
      </ContainerInfoStyled>

      <MenuStyled>
        <div className="dropdown">
          <button className="dropbtn">
            Selecione uma Categoria
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </button>
          <div className="dropdown-content">
            {categorias.map((categoria) => (
              <a
                key={categoria.id}
                href="#"
                onClick={() => handleCategoryChange(categoria.nome)}
              >
                {`Categoria ${categoria.nome}`}
              </a>
            ))}
          </div>
        </div>
        <Botao onClick={() => setIsTabelaDePontosOpen(true)}>  <IoMdAddCircleOutline size={18} /> Atualizar Tabela</Botao>
      </MenuStyled>

      {isTabelaDePontosOpen && (
        <TabelaDePontos
          onClose={() => setIsTabelaDePontosOpen(false)} 
          onConfirm={handleCsvUpload}
          onFileChange={handleFileChange} 
          file={file} 
        />
      )}

      <ScrollableAtividades>
        <TableStyled>
          <thead>
            <tr>{renderCategoryTitle()}</tr>
            <tr>
              <ThStyled>Itens de cada categoria</ThStyled>
              <ThStyled>ATIVIDADES</ThStyled>
              <ThStyled>Métrica</ThStyled>
              <ThStyled>Teto autorizado</ThStyled>
              <ThStyled>Horas Submetidas</ThStyled>
              <ThStyled>Horas Consideradas</ThStyled>
            </tr>
          </thead>
          <tbody>{renderTableContent()}</tbody>
        </TableStyled>
      </ScrollableAtividades>
    </>
  );
};

export default TabelaDePontosAdmin;
