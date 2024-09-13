import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const ContainerWrapp = styled.div`
    height: 100vh;
    position: relative;
`;

const ContainerTop = styled.div`
    background-image: url('./background-home.svg');
    height: 40%;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    & img{
        margin-left: 30px;
    }

    & h2 {
        font-family: 'Archivo', sans-serif;
        color: white;
        font-weight: 600;
        font-size: 1.5rem;
        z-index: 1;
    }

    & button{
        padding: 10px 20px;
        background-color: transparent;
        border: none;
        color: white;
        transition: 200ms;
        font-size: 1rem;
        margin: 10px;
        border-radius: 6px;
        padding: 10px 40px;
        margin-right: 20px;
        &:hover {
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
          border: 1px solid white;
          background-color: transparent;
        }
     
    }
`;

const FormWrapper = styled.div`
    position: absolute;
    top: 60%; 
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    width: 80%;  
    max-width: 1000px; 
    box-sizing: border-box;

    & .section-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 20px;
    }

    & .section {
        flex: 1;
        margin-bottom: 20px;
    }

    & .section h2 {
        font-family: 'Archivo', sans-serif;
        font-weight: 500;
        margin-bottom: 10px;
    }

    & .section hr {
        margin-bottom: 15px;
        border: none;
        border-top: 1px solid #dcdcdc;
        width: 100%;
    }

    & label {
        font-family: 'Poppins', sans-serif;
        display: block;
        margin-bottom: 8px;
    }

    & input,
    & select {
        border: 1px solid #dcdcdc;
        border-radius: 8px;
        padding: 0 10px;
        box-sizing: border-box;
        margin-top: 5px;
        outline: none; 
    }

    & input[type="text"],
    & input[type="date"],
    & input[type="tel"],
    & input[type="email"],
    & input[type="password"],
    & select {
        height: 35px;
        width: 100%;
    }

    & .form-row {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        margin-bottom: 15px;
    }

    & .form-row > div {
        flex: 1 1 calc(50% - 15px);
        min-width: 0;
    }

    & .form-row .full-width {
        flex: 1 1 100%;
    }

    & .required-info {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        font-family: 'Poppins', sans-serif;
        color: #8257e5a3;
    }

    & .required-info svg {
        margin-right: 10px;
    }

    & .button-container {
        display: flex;
        justify-content: center; 
        align-items: end;
        margin-top: 20px;
    }

    & button {
        background-color: #04D361;
        color: white;
       
        border: 2px solid transparent;
        border-radius: 8px;
        padding: 8px;
        cursor: pointer;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        margin-top: 15px;
        width: 80%;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    & button:hover {
        background-color: #03a14a;
        box-shadow: 0 0 12px rgba(255, 255, 255, 0.9); 
    }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    siape: '',
    cpf: '',
    dataDeNascimento: '',
    genero: '',
    whatsapp: '',
    email: '',
    password: '',
    roleId: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
  };
  
  const handleBackClick = () => {
    navigate('/'); // Navega para a página inicial
  };

  const handleLogoClick = () => {
    navigate('/'); // Navega para a página inicial
  };

  return (
    <ContainerWrapp>
        <ContainerTop>
        <img src="./logo-completa.svg" alt="Logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }} />
            <h2>Olá, vamos iniciar seu cadastro.</h2>
            <button onClick={handleBackClick}>Voltar</button>
        </ContainerTop>

        <FormWrapper>
            <div className="section-container">
                <div className="section">
                    <h2>Seus dados</h2>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nome Completo:
                            <input
                                type="text"
                                name="nomeCompleto"
                                value={formData.nomeCompleto}
                                onChange={handleChange}
                                required
                                className="full-width"
                            />
                        </label>
                        <div className="form-row">
                            <div>
                                <label>
                                    SIAPE:
                                    <input
                                        type="text"
                                        name="siape"
                                        value={formData.siape}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    CPF:
                                    <input
                                        type="text"
                                        name="cpf"
                                        value={formData.cpf}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div>
                                <label>
                                    Data de Nascimento:
                                    <input
                                        type="date"
                                        name="dataDeNascimento"
                                        value={formData.dataDeNascimento}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Gênero:
                                    <select
                                        name="genero"
                                        value={formData.genero}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="feminino">Feminino</option>
                                        <option value="outro">Outro</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div>
                                <label>
                                    WhatsApp:
                                    <input
                                        type="tel"
                                        name="whatsapp"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Tipo de Perfil:
                                    <select
                                        name="roleId"
                                        value={formData.roleId}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecione</option>
                                        <option value="servidor">Servidor</option>
                                        <option value="professor">Professor</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="section">
                    <h2>Dados de acesso</h2>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div>
                                <label>
                                    Email:
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Confirme o email:
                                    <input
                                        type="email"
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div>
                                <label>
                                    Senha:
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Confirme a senha:
                                    <input
                                        type="password"
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className="required-info">
                           <img src="./important.svg" alt="Preencha todos os campos!" />
                            <span>Todos os campos são obrigatórios</span>
                        </div>
                        <div className="button-container">
                            <button type="submit">

                                Cadastrar
                            </button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </FormWrapper>
    </ContainerWrapp>
  );
};

export default Register;
