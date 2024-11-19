import React, { useState } from "react";
import { styled } from "styled-components";
import Header from "../../components/Header";

// Estilos com styled-components
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
  margin-bottom: 40px;
`;

const ContainerInfoStyled = styled.div`
  font-family: "Archivo", sans-serif;
  background-color: #6750A4;
  color: white;
  text-align: center;
  padding: 20px;
  border-radius: 8px; /* Bordas arredondadas */
  margin-bottom: 20px;
`;

const TitleStyled = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  margin: 0 0 10px; /* Espaçamento inferior */
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
  background-color: #6750A4;
  color: white;
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

const TabelaDePontosPep = () => {

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const renderCategoryTitle = () => {
    switch (selectedCategory) {
      case "Categoria I":
        return <CategoryTitleStyled colSpan="6">CATEGORIA I - PALESTRAS, ENCONTROS, SEMINÁRIOS E REUNIÕES DIDÁTICOS - PEDAGÓCICOS ORGANIZADOS PELO CASa </CategoryTitleStyled >;
      case "Categoria II":
        return <CategoryTitleStyled  colSpan="6">CATEGORIA II - CURSOS, MINICURSOS, OFICINAS E SEMANAS PEDAGÓGICAS</CategoryTitleStyled >;
      case "Categoria III":
        return <CategoryTitleStyled  colSpan="6">CATEGORIA III - PARTICIPAÇÃO EM COMISSÕES E ORIENTAÇÃO DE DISCENTES</CategoryTitleStyled >;
      case "Categoria IV":
        return <CategoryTitleStyled  colSpan="6">CATEGORIA IV – PRODUÇÃO CIENTÍFICA, DE INOVAÇÃO, TÉCNICA OU ARTÍSTICA</CategoryTitleStyled >;
      case "Soma Total de Pontos":
        return <CategoryTitleStyled  colSpan="6">Soma Total de Pontos</CategoryTitleStyled >;
      default:
        return null;
    }
  };

  const renderTableContent = () => {
    switch (selectedCategory) {
      case "Categoria I":
        return (
          <>  
            <tr>
              <ThStyled>Item 1</ThStyled>
              <ThStyled>Atividade 1</ThStyled>
              <ThStyled>Métrica 1</ThStyled>
              <ThStyled>Teto 1</ThStyled>
              <ThStyled>Horas Submetidas</ThStyled>
              <ThStyled>Horas Consideradas</ThStyled>
            </tr>
            <tr>
              <ThStyled>Item 2</ThStyled>
              <ThStyled>Atividade 2</ThStyled>
              <ThStyled>Métrica 2</ThStyled>
              <ThStyled>Teto 2</ThStyled>
              <ThStyled>Horas Submetidas</ThStyled>
              <ThStyled>Horas Consideradas</ThStyled>
            </tr>
          </>
        );
      case "Categoria II":
        return (
          <>
          
            <tr>
              <ThStyled>Item A</ThStyled>
              <ThStyled>Atividade A</ThStyled>
              <ThStyled>Métrica A</ThStyled>
              <ThStyled>Teto A</ThStyled>
              <ThStyled>Horas Submetidas</ThStyled>
              <ThStyled>Horas Consideradas</ThStyled>
            </tr>
            <tr>
              <ThStyled>Item B</ThStyled>
              <ThStyled>Atividade B</ThStyled>
              <ThStyled>Métrica B</ThStyled>
              <ThStyled>Teto B</ThStyled>
              <ThStyled>Horas Submetidas</ThStyled>
              <ThStyled>Horas Consideradas</ThStyled>
            </tr>
          </>
        );
        case "Categoria III":
        return (
          <>
            <tr>
              <ThStyled>Item B</ThStyled>
              <ThStyled>Atividade B</ThStyled>
              <ThStyled>Métrica A</ThStyled>
              <ThStyled>Teto B</ThStyled>
              <ThStyled>Horas Submetidas</ThStyled>
              <ThStyled>Horas Consideradas</ThStyled>
            </tr>
            <tr>
              <ThStyled>Item B</ThStyled>
              <ThStyled>Atividade B</ThStyled>
              <ThStyled>Métrica B</ThStyled>
              <ThStyled>Teto B</ThStyled>
              <ThStyled>Horas Submetidas</ThStyled>
              <ThStyled>Horas Consideradas</ThStyled>
            </tr>
          </>
        );
        case "Categoria IV":
        return (
          <>
            <tr>
              <ThStyled>Item A</ThStyled>
              <ThStyled>Atividade A</ThStyled>
              <ThStyled>Métrica A</ThStyled>
              <ThStyled>Teto A</ThStyled>
              <ThStyled>Horas Submetidas</ThStyled>
              <ThStyled>Horas Consideradas</ThStyled>
            </tr>
            <tr>
              <ThStyled>Item B</ThStyled>
              <ThStyled>Atividade B</ThStyled>
              <ThStyled>Métrica B</ThStyled>
              <ThStyled>Teto B</ThStyled>
              <ThStyled>Horas Submetidas</ThStyled>
              <ThStyled>Horas Consideradas</ThStyled>
            </tr>
          </>
        );
        case "Soma Total de Pontos":
          return (
            <>
              <tr>
                <ThStyled colSpan="6" style={{ textAlign: "center" }}>
                  SOMA TOTAL DE HORAS CONSIDERADAS PARA CUMPRIMENTO DO EXIGIDO PELO
                  PROGRAMA DE FORMAÇÃO DOENTE: 900
                </ThStyled>
              </tr>
            </>
          );
      // Adicione mais casos conforme necessário
      default:
        return <tr><td colSpan="6">Selecione uma categoria para ver a tabela.</td></tr>;
    }
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
            Selecione uma Opção
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </button>
          <div className="dropdown-content">
            <a href="#" onClick={() => handleCategoryChange("Categoria I")}>
              Categoria I
            </a>
            <a href="#" onClick={() => handleCategoryChange("Categoria II")}>
              Categoria II
            </a>
            <a href="#" onClick={() => handleCategoryChange("Categoria III")}>
              Categoria III
            </a>
            <a href="#" onClick={() => handleCategoryChange("Categoria IV")}>
              Categoria IV
            </a>
            <a href="#" onClick={() => handleCategoryChange("Soma Total de Pontos")}>
              Soma Total de Pontos
            </a>
          </div>
        </div>
      </MenuStyled>
      <TableStyled>
        <thead>
        <tr>
            {renderCategoryTitle()}
          </tr>
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
      </TableStyled>
    </>
  );
};

export default TabelaDePontosPep;
