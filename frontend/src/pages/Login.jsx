import { useState } from "react";
import { styled, keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const move = keyframes`
0% { transform: translateX(0); }
50% { transform: translateX(20px); }
100% { transform: translateX(0); }
`;

const ContainerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #f5f0f7;
  height: 100vh;
  padding: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    height: auto;
  }
`;

const ContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  max-width: 400px;
  height: auto;
  min-height: 500px;

  & img {
    margin: 0px;
  }

  & p {
    font-family: "Poppins", sans-serif;
    font-weight: 100;
    letter-spacing: 1px;
    margin: 6px;
  }

  & .titleContainer {
    margin-bottom: 30px;
    font-size: 24px;

    @media (max-width: 480px) {
      font-size: 20px;
    }
  }

  & form {
    display: flex;
    flex-direction: column;
    background-color: #f2ecf5;
    padding: 20px;
    width: 100%;
    max-width: 300px;
    border: 1px solid #ccc;
    border-radius: 8px;

    & label {
      display: flex;
      align-items: center;
      font-family: "Poppins", sans-serif;
      font-weight: 100;
      margin-top: 10px;

      & span {
        display: flex;
        align-items: center;
      }

      & p {
        margin-left: 5px;
        color: red;
        font-size: 16px;
      }
    }

    & input {
      border-radius: 6px;
      border: 1px solid #ccc;
      padding: 8px;
      font-family: "Archivo", sans-serif;
      font-size: 14px;
      outline: none;
    }

    & select {  
      border-radius: 6px;
      border: 1px solid #ccc;
      padding: 8px;
      font-family: "Archivo", sans-serif;
      font-size: 14px;
      outline: none;
    }

    & button {
      background-color: #774fd1;
      padding: 10px;
      border-radius: 6px;
      margin-top: 20px;
      color: #ffff;
      font-family: "Poppins", sans-serif;
      font-weight: 400;
      font-size: 15px;
      border: none;

      &:hover {
        cursor: pointer;
        background-color: #7b46f6;
        color: #ccc;
      }
    }
  }

  & div {
    padding: 20px;
    margin-top: 20px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 8px;

    & p {
      font-size: 15px;
      & a {
        text-decoration: none;
        color: #774fd1;

        &:hover {
          color: #764fd178;
        }
      }
    }
  }

  @media (max-width: 768px) {
    width: 80%;
    & form,
    & div {
      width: 100%;
      max-width: none;
      padding: 20px;
    }
  }

  @media (max-width: 480px) {
    & form {
      padding: 10px;
    }
  }
`;

const ContainerRigth = styled.div`
  background-image: url("./background-login.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  border-radius: 30px;
  width: 35%;
  height: 90%;
  margin: 10px;

  & .imgBoy {
    z-index: 2;
    box-shadow: 1px;
    max-width: 100%;
  }

  & .imgItens {
    z-index: 1;
    position: absolute;
    overflow: hidden;
    object-fit: cover;
    width: 40%;
    animation: ${move} 5s infinite;
  }

  @media (max-width: 768px) {
    width: 80%;
    margin: 0;

    & .imgBoy {
      width: 60%;
    }
  }

  @media (max-width: 480px) {
    width: 100%;

    & .imgBoy {
      width: 80%;
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
    
      const response = await axios.post("https://scasa.ufc.br/api/auth/login", {
        email,
        password,
        roleId: Number(roleId)
        , 
      });

      if (response.status === 200) {
        const { token, id } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", email);
        localStorage.setItem("id", id);
        localStorage.setItem("roleId", roleId); 

   
        if (roleId === "1") {
          navigate("/admin");
        } else if (roleId === "3") {
          navigate("/pep");
        } else if (roleId === "2") {
          navigate("/servidor");
        }
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Falha no login");
      } else {
        setErrorMessage("Erro ao conectar com o servidor");
      }
      console.error("Erro durante o login:", error);
    }
  };

  return (
    <ContainerWrap>
      <ContainerLeft>
        <img src="./logo-siscasa-home.svg" alt="" />
        <p className="titleContainer">Entrar no SisCASa</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email <p>*</p>
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>
            Perfil <p>*</p>
          </label>
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            required
          >
            <option value="">Selecione um perfil</option>
            <option value="3">Professor</option>
            <option value="2">Servidor</option>
            <option value="1">Administrador</option>
          </select>
          <label>
            <span>
              Senha <p>*</p>
            </span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
        <div>
          <p>
            Novo no SisCASa? <Link to={"/register"}>Crie uma conta</Link>
          </p>
        </div>
      </ContainerLeft>
      <ContainerRigth>
        <img className="imgBoy" src="./boy-login.svg" alt="" />
        <img className="imgItens" src="./itens-login.svg" alt="" />
      </ContainerRigth>
    </ContainerWrap>
  );
};

export default Login;