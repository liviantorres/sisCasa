import styled from "styled-components";
import { BsExclamationOctagon } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
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
  padding: 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%; 
  max-width: 800px; 
  margin: 20px; 
  z-index: 1000;
`;

const FormWrapper = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 100%;
  box-sizing: border-box;

  & .section {
    margin-bottom: 15px; 
  }

  & .section h2 {
    font-family: "Archivo", sans-serif;
    font-weight: 500;
    margin-bottom: 10px;
  }

  & label {
    font-family: "Poppins", sans-serif;
    display: block;
    margin-bottom: 5px;
  }

  & input,
  & select {
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    padding: 8px;
    box-sizing: border-box;
    margin-top: 5px;
    outline: none;
    width: 100%; 
  }

  & .form-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px; 
    margin-bottom: 10px; 
  }

  & .form-row > div {
    flex: 1 1 calc(50% - 10px); 
    min-width: 0;
  }

  & .required-info {
    display: flex;
    align-items: center;
    margin-bottom: 15px; 
    font-family: "Poppins", sans-serif;
    color: #8257e5a3;
  }

  & .button-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  & button {
    background-color: #04d361;
    color: white;
    border: 2px solid transparent;
    border-radius: 8px;
    padding: 10px; 
    cursor: pointer;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    width: 100%; 
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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px; 
`;

const FormAdcUsuario = ({ onClose, onSave }) => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [siape, setSiape] = useState("");
  const [cpf, setCpf] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [dataDeNascimento, setDataDeNascimento] = useState("");
  const [roleIds, setRoleIds] = useState([]);

  const roleMapping = {
    admin: 1,
    servidor: 2,
    professor: 3,
  };

  const handleRoleChange = (role) => {
    const roleId = roleMapping[role];
    setRoleIds((prevRoleIds) => {
      if (prevRoleIds.includes(roleId)) {
        return prevRoleIds.filter((id) => id !== roleId); 
      } else {
        return [...prevRoleIds, roleId]; 
      }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      alert("Os emails não coincidem.");
      return;
    }

    if (password !== confirmSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    const novoUsuario = {
      nomeCompleto,
      email,
      siape,
      cpf,
      whatsapp,
      dataDeNascimento,
      password,
      roleIds,
    };

    onSave(novoUsuario);
    onClose();
  };

  return (
    <Overlay>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <FormWrapper>
          <CloseIcon onClick={onClose} />
          <div className="section-container">
            <div className="section">
              <h2>Dados do Usuário: </h2>
              <hr />
              <form onSubmit={handleSave}>
                <label>
                  Nome Completo:
                  <input
                    type="text"
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
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
                        value={siape}
                        onChange={(e) => setSiape(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      CPF:
                      <input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
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
                        value={dataDeNascimento}
                        onChange={(e) => setDataDeNascimento(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <label>
                      WhatsApp:
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Tipo de Perfil:
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          flexWrap: "wrap",
                        }}
                      >
                        <CheckboxLabel>
                          <input
                            type="checkbox"
                            value="admin"
                            checked={roleIds.includes(roleMapping.admin)}
                            onChange={() => handleRoleChange("admin")}
                          />
                          Administrador
                        </CheckboxLabel>
                        <CheckboxLabel>
                          <input
                            type="checkbox"
                            value="servidor"
                            checked={roleIds.includes(roleMapping.servidor)}
                            onChange={() => handleRoleChange("servidor")}
                          />
                          Servidor
                        </CheckboxLabel>
                        <CheckboxLabel>
                          <input
                            type="checkbox"
                            value="professor"
                            checked={roleIds.includes(roleMapping.professor)}
                            onChange={() => handleRoleChange("professor")}
                          />
                          Professor
                        </CheckboxLabel>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <label>
                      Email:
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Confirme o Email:
                      <input
                        type="email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Confirme a Senha:
                      <input
                        type="password"
                        value={confirmSenha}
                        onChange={(e) => setConfirmSenha(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <div className="required-info">
                    <BsExclamationOctagon />
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
