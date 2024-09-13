import { styled } from "styled-components";

const Header = () => {

    const ContainerWrap = styled.div`
        display: flex;
        justify-content: space-between;
        font-family: 'Archivo', sans-serif;
        
    `;

    const ContainerInput = styled.div`
        margin-left: 40rem;
        
        & input {
            padding: 10px 200px 10px 20px;
            border-radius: 30px;
            background-color: #D1D1D6;
            background-image: url("./lupa.svg");
            background-repeat: no-repeat;
            background-position: right 10px center;
            background-size: 20px;
            text-align: start;
            font-family: 'Archivo', sans-serif;
            font-weight: 100;
            font-size: 18px;
            border: none; 
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2); 
        }
    `;
    const ContainerUsuario = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
        
        & .usuario{
            width: 50px;
        }
        & .seta{
            width: 30px;
            &:hover{
                cursor: pointer;
            }
        }
    `;
    

    return ( 
        <>
            <ContainerWrap>
                <ContainerInput>
                    <input type="text" placeholder="Pesquisar cursos" />
                </ContainerInput>
                <ContainerUsuario>
                    <img className="usuario" src="./usuario.svg" alt="" />
                    <img className="seta" src="./seta.svg" alt="" />
                </ContainerUsuario>
            </ContainerWrap>
        </>
     );
}
 
export default Header;