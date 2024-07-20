import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Home = () => {
    const ContainerWrap = styled.div`
      margin: 0;
      background-image: url('./background-home.svg');
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      height: 100vh;

      @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes moveBg {
            0% { background-position: 0 0; }
            100% { background-position: 100% 0; }
        }
        
      
    `;

    const Header = styled.header`
        display: flex;
        justify-content: space-between;
        & img{
            padding: 30px;
        }
        & div{
            padding: 30px;
            & Button{
                padding: 15px 60px 15px 60px;
                background-color: transparent;
                transition: 200ms;
                font-size: larger;
                &:hover{  
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
                }
            }
        }
    `;

    const Text = styled.h3`
      font-family: 'Poppins', sans-serif;
      font-weight: 100;
      font-size: 30px;
      letter-spacing: 1.7px;
    
    `;

    const Button = styled.button`
        font-family: 'Archivo', sans-serif;
        font-weight: 500;
        border-radius: 5px;
        border: none;
        color: #FFFF;
    `;

    const ContainerLeft = styled.div`
        color: #FFFF;
        margin: 5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        animation: fadeIn 3s ease-in-out;

        & div{
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 70px;
            & h2 {
                line-height: 1;
                margin: 0;
                
            }
            & .cas {
                position: relative;
                top: -11px; 
                font-family: 'Oswald', sans-serif;
                font-weight: 300;
            }
            & .a{
                position: relative;
                top: -14px;
                font-family: 'Mitr', sans-serif;
                font-weight: 400;
                border-bottom: 10px solid #04D361;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
            }
        }
        & Button{
            background-color: rgba(255, 255, 255, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            padding: 10px 40px 10px 40px;
            width: 25%;
            margin-top: 30px;
            margin-left: 25%;
            transition: 200ms;
            & img{
                margin-right: 10px;       
            }
            &:hover{
                background-color: #ffffffda;
                color: #202B3B;
                cursor: pointer;
                & img {
                    filter: invert(0.7);
                }
            }
        
        }
    `;

    const ContainerLeftRigth = styled.div`
        display: flex;
        justify-content: space-evenly;
        margin: 5%;
        animation: fadeIn 3s ease-in-out;

        & .img-home  {
            filter: drop-shadow(0 0 5px white); 
            background-image: url('./fundo-home.svg');
            background-repeat: no-repeat;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: moveBg 5s linear infinite;
            
        }



    `;
    
    return ( 
        <>
        <ContainerWrap>
            <Header>
                <img src="./logo-siscasa2.svg" alt="" />
                <div>
                    <Link to={"/login"}><Button>Entrar</Button></Link>
                    <Button>Cadastrar</Button>
                </div>
            </Header>
            <ContainerLeftRigth>
            <ContainerLeft>
                <Text>Seja bem-vindo ao</Text>
                <div>
                    <img src="./logo-siscasa.svg" alt="" />
                    <h2 style={{fontFamily: 'Miriam Libre, sans-serif', fontWeight: '400'}}>Sis</h2>
                    <h2 className="cas">CAS</h2>
                    <h2 className="a">a</h2>
                </div>
                <Text>Sua plataforma de atividades acadêmicas!</Text>
           
                <Button><img src="./livro.svg" alt="" />Começar</Button>
            </ContainerLeft>
            
                <img className="img-home" src="./img-home.svg" alt="" />

            </ContainerLeftRigth>
            
        </ContainerWrap>

        </>
     );
}
 
export default Home;