import { styled } from "styled-components";
import Header from "../../components/Header";


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



const TabelaDePontosAdmin = () => {

  return (
    <>
      <Header />
      <ContainerConteudo>
        <Titulo>Tabela de Pontos Admin</Titulo>
        <table>
  <thead>
    <tr>
      <th colspan="2">Barema CASa (Tabela de pontuação no Programa de Formação Docente)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2">Atenção: O docente deve cumprir atividades em, pelo menos, três das categorias abaixo.</td>
    </tr>
    <tr>
      <td colspan="2">
        Serão cumpridas 128 horas de atividades formativas sendo, obrigatoriamente, 64 horas em atividades na CATEGORIA I e no máximo 64 horas de atividades em, pelo menos, duas das demais CATEGORIAS II, III, IV (Ensino, Pesquisa, Extensão e Gestão).
      </td>
    </tr>
  </tbody>
</table>


        <ScrollableAtividades>
         
        </ScrollableAtividades>
      </ContainerConteudo>
    </>
  );
};

export default TabelaDePontosAdmin;

