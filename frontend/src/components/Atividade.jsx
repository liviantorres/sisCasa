import { styled } from "styled-components";
import PropTypes from 'prop-types';
import { lighten } from 'polished'
import { FaEye } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";


const ContainerWrap = styled.div`
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 30px;
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
        font-weight:600;
    `;
    
    const Descricao = styled.div`
        padding: 20px;
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
        & h2{
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
            background-color: ${({ cor }) => cor ? lighten(0.1, cor) : '#48248fb9'};
            transform: scale(1.05);  
        }
    `;


const Atividade = ({titulo, descricao, professor, status, botoes=[], onVisualizar}) => {
    

    return ( 
        <>
        <ContainerWrap>
            <Titulo>{titulo}</Titulo>
            <Descricao>
                <h3>Descrição:</h3>
                <p>{descricao}</p>
            </Descricao>
            <ContainerInformacoesCurso>
            {onVisualizar && (
            <Botao onClick={onVisualizar}>
              <FaEye size={18} /> Visualizar
            </Botao>
          )}
                {professor &&  <div><h3>Professor:</h3> <h2>{professor}</h2></div>}
                {status && <div><h3>Status:</h3><h2>{status}</h2></div>}
               <div>
                {botoes.map((botao, index)=>(
                  botao.texto == 'Editar' ? (
                        <Botao key={index} cor="#9159FF" onClick={botao.onClick}><FaEdit/>{botao.texto}</Botao>
                  ):(
                        <Botao key={index} cor="#4B3E65" onClick={botao.onClick}><FaRegTrashAlt/>{botao.texto}</Botao>
                    )
                ))}
               </div>
                
            </ContainerInformacoesCurso>
        </ContainerWrap>
        </>
     );
}

Atividade.propTypes = {
    titulo: PropTypes.string.isRequired, 
    descricao: PropTypes.string.isRequired,
    cargaHoraria: PropTypes.string,
    professor: PropTypes.string,
    status: PropTypes.string,
    botoes: PropTypes.arrayOf(
        PropTypes.shape({
            texto: PropTypes.string.isRequired,
            cor: PropTypes.string,
            onClick: PropTypes.func.isRequired
        })
    ).isRequired,
    onVisualizar: PropTypes.func.isRequired, 
} 
 
export default Atividade;