import styled from "styled-components";
import { BsExclamationOctagon } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ContainerAdc = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 40%;
  z-index: 1000;
`;

const FormWrapper = styled.div`
  position: absolute;
  top: 50%;
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
    font-family: "Archivo", sans-serif;
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
    font-family: "Poppins", sans-serif;
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
    font-family: "Poppins", sans-serif;
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
    background-color: #04d361;
    color: white;

    border: 2px solid transparent;
    border-radius: 8px;
    padding: 8px;
    cursor: pointer;
    font-family: "Poppins", sans-serif;
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

const CloseIcon = styled(IoIosClose)`
  position: absolute;
  right: 8px; 
  top: 5px;
  cursor: pointer;
  font-size: 32px;
  color: #000000c6;
`;

const FormAdcUsuario = ({ onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <FormWrapper>
            <CloseIcon onClick={onClose}/>
          <div className="section-container">
            <div className="section">
              <h2>Dados do Usuário: </h2>
              <hr />
              <form>
                <label>
                  Nome Completo:
                  <input
                    type="text"
                    name="nomeCompleto"
                    required
                    className="full-width"
                  />
                </label>
                <div className="form-row">
                  <div>
                    <label>
                      SIAPE:
                      <input type="text" name="siape" required />
                    </label>
                  </div>
                  <div>
                    <label>
                      CPF:
                      <input type="text" name="cpf" />
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <label>
                      Data de Nascimento:
                      <input type="date" name="dataDeNascimento" required />
                    </label>
                  </div>
                  <div>
                    <label>
                      Gênero:
                      <select name="genero" required>
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
                      <input type="tel" name="whatsapp" required />
                    </label>
                  </div>
                  <div>
                    <label>
                      Tipo de Perfil:
                      <select name="roleId" required>
                        <option value="">Selecione</option>
                        <option value="admin">Administrador</option>
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
              <form>
                <div className="form-row">
                  <div>
                    <label>
                      Email:
                      <input type="email" name="email" required />
                    </label>
                  </div>
                  <div>
                    <label>
                      Confirme o email:
                      <input type="email" required />
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <label>
                      Senha:
                      <input type="password" name="password" required />
                    </label>
                  </div>
                  <div>
                    <label>
                      Confirme a senha:
                      <input type="password" required />
                    </label>
                  </div>
                </div>
                <div>
                  <div className="required-info">
                  <BsExclamationOctagon/>
                    <span>Todos os campos são obrigatórios</span>
                  </div>
                  <div className="button-container">
                    <button type="submit">Adicionar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </FormWrapper>
      </ContainerAdc>
    </Overlay>
  );
};

export default FormAdcUsuario;
