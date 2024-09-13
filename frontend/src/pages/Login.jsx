import { styled, keyframes } from "styled-components";
import { Link } from "react-router-dom";

const Login = () => {

    const move = keyframes`
    0% {
        transform: translateX(0); /* Começa na posição inicial */
    }
    50% {
        transform: translateX(20px); /* Move para a direita */
    }
    100% {
        transform: translateX(0); /* Volta à posição inicial */
    }
`;

    const ContainerWrap = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #F5F0F7;
        height: 100vh;
    `;

    const ContainerLeft = styled.div`
           display: flex;
           flex-direction: column;
           align-items: center;
           width: 40%;
           

            & img{
                margin: 8px;
            }
           & p{
            font-family: 'Poppins', sans-serif;
            font-weight: 100;
            letter-spacing: 1px;
            margin: 10px;
           }
           & .titleContainer {
                margin-bottom: 50px;
                font-size: 30px;
           }
           & form{
                display: flex;
                flex-direction: column;
                background-color: #F2ECF5;
                padding: 50px;
                width: 50%;
                border: 1px solid #ccc;
                border-radius: 8px;

                & label{
                    margin-top: 10px;
                    font-family: 'Poppins', sans-serif;
                    font-weight: 100;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    & p{
                        font-size: 15px;
                        color: #ED2C2C;
                    }
                }
                & .labelSenha{
                    justify-content: space-between;
                    & a{
                        text-decoration: none;
                        color: #774FD1;
                        font-family: 'Poppins', sans-serif;
                        font-weight: 100;
                        &:hover{
                            color: #764fd1cb;
                        }
                    }
                    & span{
                        display: flex;
                        justify-content: start;
                        align-items: center;
                    }
                }

                & input{
                    border-radius: 6px;
                    border: 1px solid #ccc;
                    padding: 10px; 
                    margin: 4px 0;
                    font-family: 'Archivo', sans-serif;
                    font-size: 16px; 
                }
                
                
                & button{
                    background-color: #774FD1;
                    padding: 10px; 
                    border-radius: 6px;
                    margin-top: 20px;
                    color: #F5F0F7;
                    font-family: 'Poppins', sans-serif;
                    font-weight: 400;
                    font-size: 15px;
                    border: #774FD1;
                    &:hover{
                        cursor: pointer;
                        background-color: #7b46f6;
                        color: #ccc;
                    }
                }
            }
          & div{
                padding: 50px;
                width: 50%;
                margin-top: 20px;
                border-radius: 8px;
                border: 1px solid #ccc;
                display: flex;
                justify-content: center;
                & p {
                    font-size: 15px;
                    & a{
                        text-decoration: none;
                        color: #774FD1;
                        &:hover{
                            color: #764fd178;
                        }
                    }
                }

           }
    `;

    const ContainerRigth = styled.div`
        background-image: url('./background-login.svg');
        background-repeat: no-repeat;
        background-size: cover; 
        background-position: center;
        display: flex;
        justify-content: center;
        border-radius: 30px;
        width: 40%;
        margin: 10px;
        & .imgBoy {
            z-index: 2;
            box-shadow: 1px;
        }
        & .imgItens{
            z-index: 1;
            position: absolute;
            overflow: hidden;
            object-fit: cover;
            width: 40%;
            animation: ${move} 5s infinite;
        }
        
        
    `;


    

    return ( 
        <>
        <ContainerWrap>
            <ContainerLeft>
                <img src="./logo-siscasa-home.svg" alt="" />
                <p className="titleContainer">Entrar no SisCASa</p>
                <form action="">
                    <label htmlFor="">Email <p>*</p></label>
                    <input type="text" />
                    <label className="labelSenha" htmlFor=""><span>Senha <p>*</p></span><Link>Esqueceu a senha?</Link></label>
                    
                    <input type="password" />
                    <button>Entrar</button>
                </form>
                <div>
                    <p>Novo no SisCASa? <Link>Crie uma conta</Link></p>
                </div>
            </ContainerLeft>
                
            <ContainerRigth>
                <img className="imgBoy" src="./boy-login.svg" alt="" />
                <img className="imgItens" src="./itens-login.svg" alt="" />
            </ContainerRigth>

        </ContainerWrap>
        
        </>
     );
}
 
export default Login;