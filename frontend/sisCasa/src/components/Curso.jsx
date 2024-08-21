import { styled } from "styled-components";
import PropTypes from 'prop-types';
import { lighten } from 'polished'

const ContainerWrap = styled.div`
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 50px;
    `;


    const Titulo = styled.h2`
        background-color: #774FD1;
        padding: 10px;
        color: #F5F0F7;
        font-family: 'Archivo', sans-serif;
        font-weight: 500;
        font-size: 22px;
        line-height: 30px;
        letter-spacing: 1px;
        
    `;
    
    const Descricao = styled.div`
        padding: 50px;
        background-color: #D3CEDE;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 20px;
        & h3{
            font-family: 'Archivo', sans-serif;
            font-weight: 600;
            font-size: large;
        }
        & p{
            font-family: 'Archivo', sans-serif;
            font-weight: 300;
            line-height: 1.2;
        }
    `;

    const ContainerInformacoesCurso = styled.div`
        background-color: #CCC5DF;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        
        & div {
            font-family: 'Archivo', sans-serif;
            font-weight: 600;
            font-size: 16px;
            display: flex;
            flex-direction: row;
            gap: 3px;
            align-items: center;
        }
        & h2{
            font-family: 'Archivo', sans-serif;
            font-weight: 600;
            font-size: 18px;
            color: #8257E5;
        }
       
        
        
        
    `;

    const Botao = styled.button`
        font-family: 'Archivo', sans-serif;
        font-weight: 500;
        background-color: ${({ cor }) => cor || '#04D361'};
        padding: 15px 20px 15px 20px;
        border-radius: 8px;
        border: none;
        text-transform: uppercase;
        letter-spacing: .75px;
        color: #FFFFFF;
        margin: 10px;
        transition: 200ms;
        &:hover{
            cursor: pointer;
            background-color: ${({ cor }) => cor ? lighten(0.1, cor) : '#0ce341'};
            transform: scale(1.05);  
        }
    `;


const Curso = ({titulo, descricao, cargaHoraria, professor, status, botoes=[]}) => {
    
    return ( 
        <>
        <ContainerWrap>
            <Titulo>{titulo}</Titulo>
            <Descricao>
                <h3>Descrição:</h3>
                <p>{descricao}</p>
            </Descricao>
            <ContainerInformacoesCurso>
                {cargaHoraria && <div><h3>Carga Horária:</h3> <h2>{cargaHoraria}</h2></div>}
                {professor &&  <div><h3>Professor:</h3> <h2>{professor}</h2></div>}
                {status && <div><h3>Status:</h3><h2>{status}</h2></div>}
               <div>
                {botoes.map((botao, index)=>(
                    <Botao key={index} cor={botao.cor} onClick={botao.onclick}>{botao.texto}</Botao>
                ))}
               </div>
                
            </ContainerInformacoesCurso>
        </ContainerWrap>
        </>
     );
}

Curso.propTypes = {
    titulo: PropTypes.string.isRequired, 
    descricao: PropTypes.string.isRequired,
    cargaHoraria: PropTypes.string,
    professor: PropTypes.string,
    status: PropTypes.string,
    botoes: PropTypes.arrayOf(
        PropTypes.shape({
            texto: PropTypes.string.isRequired,
            cor: PropTypes.string,
            Onclick: PropTypes.func.isRequired
        })
    ).isRequired,
} 
 
export default Curso;