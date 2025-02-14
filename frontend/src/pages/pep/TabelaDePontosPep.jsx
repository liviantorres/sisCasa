import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Header from "../../components/Header";
import axios from "axios";

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

const LinkStyled = styled.a`
  color: white;  
`;

const ThStyled = styled.th`
font-weight: 400;
  padding: 10px;
  text-align: left;
  border: 1px solid white;
`;
const MenuStyled = styled.div`
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

const TabelaDePontosPep = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [participacao, setParticipacao] = useState([])

  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id')

  const fetchCategorias = async () => {
    try {
      const response = await axios.get(`http://200.129.40.161:3000/categorias`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategorias(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    }
  };

  const fetchParticipacoes = async () =>{
    console.log(id);
    try {
      const response = await axios.get(`http://200.129.40.161:3000/pontuacao/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      });
      setParticipacao(response.data);
      console.log(participacao)
    } catch (error) {
      console.log("Erro ao buscar participacoes: ", error)
    }
  }

  useEffect(() => {
    fetchCategorias();
    fetchParticipacoes();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
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

    return <CategoryTitleStyled colSpan="6">Selecione uma categoria</CategoryTitleStyled>;
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
  
    return selectedCategoryData.atividades.map((atividade, index) => {
    console.log("atividadeId " + atividade.id);
    console.log("Atividades:", selectedCategoryData.atividades);

  
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
            {participacaoUsuario ? participacaoUsuario.horasConsideradas : "N/A"}
          </ThStyled>
        </tr>
      );
    });
  };

  const renderTableFooter = () => {
    const totalHorasConsideradas = participacao.reduce((total, item) => {
      return total + (item.horasConsideradas || 0);
    }, 0);
  
    return (
      <tr>
        <ThStyled colSpan="5" style={{ textAlign: "right", fontWeight: "bold" }}>
          Total de Horas Consideradas:
        </ThStyled>
        <ThStyled style={{ fontWeight: "bold" }}>{totalHorasConsideradas}</ThStyled>
      </tr>
    );
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
          horas de atividades em, pelo menos, duas das demais CATEGORIAS II, III, IV
          (Ensino, Pesquisa, Extensão e Gestão).
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
      </MenuStyled>
      <ScrollableAtividades>

      <TableStyled>
        <thead>
          <tr>{renderCategoryTitle()}</tr>
          <tr>
            <ThStyled>Itens de cada categoria</ThStyled>
            <ThStyled>
              ATIVIDADES (Definição das Atividades no link:{" "}
              <LinkStyled href="https://eideia.ufc.br/wp-content/uploads/2024/03/casa-programa-de-formacao-em-docencia-do-ensino-superior-070324.pdf">
                PDF
              </LinkStyled>
              )
            </ThStyled>
            <ThStyled>Métrica</ThStyled>
            <ThStyled>
              Teto autorizado para cada atividade/ação docente (h)
            </ThStyled>
            <ThStyled>Horas Submetidas</ThStyled>
            <ThStyled>Horas Consideradas</ThStyled>
          </tr>
        </thead>
        <tbody>{renderTableContent()}</tbody>
        <tfoot>{renderTableFooter()}</tfoot>
      </TableStyled>
      </ScrollableAtividades>
    </>
  );
};

export default TabelaDePontosPep;
