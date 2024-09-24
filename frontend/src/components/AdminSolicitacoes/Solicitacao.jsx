import { styled } from "styled-components";
import { lighten } from 'polished';

const ContainerWrap = styled.div`
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 30px;
`;

const Titulo = styled.h2`
    background-color: #774FD1;
    padding: 10px;
    color: #ffff;
    font-family: 'Archivo', sans-serif;
    font-weight: 600;
    font-size: 22px;
    line-height: 30px;
    letter-spacing: 1px;
`;

const Descricao = styled.div`
    padding: 20px;
    background-color: #D3CEDE;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    
    & h3 {
        font-family: 'Archivo', sans-serif;
        font-weight: 600;
        font-size: large;
    }
    
    & p {
        font-family: 'Archivo', sans-serif;
        font-weight: 100;
        font-size: 20px;
        line-height: 1.2;
    }
`;

const ContainerInformacoesCurso = styled.div`
    background-color: #CCC5DF;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    
    & div {
        font-family: 'Archivo', sans-serif;
        font-weight: 600;
        font-size: 16px;
        display: flex;
        flex-direction: row;
        gap: 3px;
        align-items: center;
    }
    
    & h2 {
        font-family: 'Archivo', sans-serif;
        font-weight: 600;
        font-size: 18px;
        color: #8257E5;
    }
`;

const Botao = styled.button`
    font-family: 'Archivo', sans-serif;
    font-weight: 600;
    display: flex;
    text-transform: uppercase;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    background-color: ${({ cor }) => cor || '#47248F'};
    padding: 15px 20px;
    border-radius: 8px;
    border: none;
    color: #FFFFFF;
    margin: 10px;
    transition: 200ms;
    
    &:hover {
        cursor: pointer;
        background-color: ${({ cor }) => cor ? lighten(0.1, cor) : '#48248fb9'};
        transform: scale(1.05);  
    }
`;

const StatusDot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ status }) => {
        switch (status) {
            case 'pendente':
                return 'yellow';
            case 'rejeitado':
                return 'red';
            case 'aceito':
                return 'green';
            default:
                return 'gray'; 
        }
    }};
`;



const H3 = styled.h3`
    font-family: 'Archivo', sans-serif;
    margin-left: 20px;
`;

const P = styled.p`
    font-family: "Archivo", sans-serif;
    font-weight: 100;
`;

const DataStyled = styled.h3`
    color: #8257E5;
    margin: 0; 
`;

const Solicitacao = ({ solicitacao }) => {
    const { titulo, professor, data, status } = solicitacao;

    return (
        <ContainerWrap>
            <Titulo>{titulo}</Titulo>
            <Descricao>
                <H3>Atividade:</H3>
                <P>{titulo}</P>
            </Descricao>
            <ContainerInformacoesCurso>
                <div>
                  
                    <H3>Data:</H3>
                    <DataStyled>{data}</DataStyled>
                </div>
                <div>
                    <H3>Status:</H3>
                    <StatusDot status={status} />
                    <P>{status}</P>
                   
                </div>
                <Botao>Detalhes</Botao>
            </ContainerInformacoesCurso>
        </ContainerWrap>
    );
}

export default Solicitacao;
