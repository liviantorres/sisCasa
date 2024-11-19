import { styled } from "styled-components";
import { Link } from "react-router-dom";

const ContainerWrap = styled.div`
  margin: 0;
  background-image: url("./background-home.svg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes moveBg {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  & img {
    max-width: 100%;
    height: auto;
  }
  & div {
    margin-top: 20px;
    & Button {
      padding: 10px 20px;
      background-color: transparent;
      border: none;
      color: white;
      transition: 200ms;
      font-size: 1rem;
      margin: 5px;
      &:hover {
        cursor: pointer;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
        border: 1px solid white;
        background-color: transparent;
      }
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    & div {
      display: flex;
      gap: 10px;
    }
  }
`;

const Text = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 100;
  font-size: 24px;
  letter-spacing: 1.5px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const Button = styled.button`
  font-family: "Archivo", sans-serif;
  font-weight: 500;
  border-radius: 5px;
  border: none;
  color: #ffff;
  background-color: #04d361;
  padding: 10px 20px;
  margin: 10px;
  transition: 200ms;
  &:hover {
    background-color: #03a84e;
  }
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    margin-right: 10px;
  }
`;

const ContainerLeft = styled.div`
  color: #ffff;
  margin: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: fadeIn 3s ease-in-out;
  text-align: center;
  font-size: 2rem;
  & Button {
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    padding: 10px 120px;
    width: 100%;
    max-width: 300px;
    margin: 30px auto 0;
    transition: 200ms;
    cursor: pointer;
  }

  & div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2rem;
    & h2 {
      line-height: 1;
      margin: 0;
    }
    & .cas {
      position: relative;
      top: -5px;
      font-family: "Oswald", sans-serif;
      font-weight: 300;
    }
    & .a {
      position: relative;
      top: -10px;
      font-family: "Mitr", sans-serif;
      font-weight: 400;
      border-bottom: 5px solid #04d361;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }
  }

  @media (min-width: 768px) {
    font-size: 3rem;
    & div {
      flex-direction: row;
      font-size: 3rem;
      & h2 {
        font-size: 4rem;
      }
    }
    & Button {
      width: 25%;
      margin-left: 25%;
    }
  }
`;

const ContainerLeftRigth = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5%;
  animation: fadeIn 1.5s ease-in-out;

  & .img-home {
    max-width: 100%;
    height: auto;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
    background-image: url("./fundo-home.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    animation: moveBg 10s ease-in-out infinite alternate;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;

    & .img-home {
      max-width: 50%;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes moveBg {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 100% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Home = () => {
  return (
    <>
      <ContainerWrap>
        <Header>
          <img src="./logo-siscasa2.svg" alt="Logo" />
          <div>
            <StyledLink to={"/login"}>
              <Button>Entrar</Button>
            </StyledLink>

            <StyledLink to={"/register"}>
              <Button>Cadastrar</Button>
            </StyledLink>
          </div>
        </Header>
        <ContainerLeftRigth>
          <ContainerLeft>
            <Text>Seja bem-vindo ao</Text>
            <div>
              <img src="./logo-siscasa.svg" alt="Logo" />
              <h2
                style={{
                  fontFamily: "Miriam Libre, sans-serif",
                  fontWeight: "400",
                }}
              >
                Sis
              </h2>
              <h2 className="cas">CAS</h2>
              <h2 className="a">a</h2>
            </div>
            <Text>Sua plataforma de atividades do CASa!</Text>
          </ContainerLeft>
          <img className="img-home" src="./img-home.svg" alt="Imagem Home" />
        </ContainerLeftRigth>
      </ContainerWrap>
    </>
  );
};

export default Home;
