import { styled } from "styled-components";

const Curso = () => {
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
        & h3{
            font-family: 'Archivo', sans-serif;
            font-weight: 600;
            font-size: large;
        }
        
    `;

    const Butao = styled.button`
        font-family: 'Archivo', sans-serif;
        font-weight: 500;
        background-color: #04D361;
        padding: 15px 20px 15px 20px;
        border-radius: 8px;
        border: none;
        text-transform: uppercase;
        letter-spacing: .75px;
        color: #FFFFFF;
        transition: 200ms;
        &:hover{
            cursor: pointer;
            background-color: #0ce341;
            transform: scale(1.05);  
        }
    `;

    return ( 
        <>
        <ContainerWrap>
            <Titulo>Curso de Desenvolvimento de Software</Titulo>
            <Descricao>
                <h3>Descrição:</h3>
                <p>Este curso de Desenvolvimento de Software foi projetado para fornecer uma compreensão abrangente das práticas, ferramentas e metodologias modernas de desenvolvimento de software. Ideal para iniciantes e profissionais que desejam aprimorar suas habilidades, o curso abrange desde os fundamentos da programação até técnicas avançadas de desenvolvimento e implementação.
                Este curso de Desenvolvimento de Software foi projetado para fornecer uma compreensão abrangente das práticas, ferramentas e metodologias modernas de desenvolvimento de software. Ideal para iniciantes e profissionais que desejam aprimorar suas habilidades, o curso abrange desde os fundamentos da programação até técnicas avançadas de desenvolvimento e implementação.
                
                </p>
            </Descricao>
            <ContainerInformacoesCurso>
                <h3 className="carga-horaria">Carga Horária: 30h</h3>
                <h3>Professor:</h3>
                <Butao>Inscrever-se</Butao>
            </ContainerInformacoesCurso>
        </ContainerWrap>
        </>
     );
}
 
export default Curso;