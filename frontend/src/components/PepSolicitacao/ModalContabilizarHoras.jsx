import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineFileUpload } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
  width: 50%;
  z-index: 1000;
  position: relative;
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 24px;
  cursor: pointer;
  color: #fff;
  margin-top: -20px;
  &:hover {
    color: #5a3cae;
  }
`;

const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  width: 25%;
  padding: 8px 0px;
  background-color: #1eb662;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: #168e4e;
    transform: translateY(-2px);
    box-shadow: 0px 4px 8px rgba(30, 182, 98, 0.3);
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #774fd1;
  border-radius: 8px 8px 0 0;
`;

const Header = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: #fff;
  letter-spacing: 0.9px;
  font-size: 20px;
  flex: 1;
  text-align: center;
`;

const Label = styled.label`
  font-family: "Poppins", sans-serif;
  span {
    color: #ed2c2c;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px;
`;

const FileUploadButton = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-family: "Poppins", sans-serif;
  font-weight: 100;

  width: 30%;
  padding: 8px 0px;
  background-color: #4b3e65;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  letter-spacing: 0.1em;
  text-align: center;
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #5a4b7a;
    box-shadow: 0px 6px 10px rgba(90, 75, 122, 0.4);
    transform: translateY(-2px);
  }

  input[type="file"] {
    display: none;
  }
`;

const Textarea = styled.textarea`
  font-family: "Archivo", sans-serif;
  font-weight: 100;
  font-size: 12px;
  width: 90%;
  height: 80px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
  background-color: #f2eeee;

  &::placeholder {
    color: #999;
    font-family: "Archivo", sans-serif;
    font-weight: 100;
    font-size: 13px;
  }

  &:focus {
    border-color: #774fd1;
    outline: none;
    box-shadow: 0 0 2px rgba(119, 79, 209, 0.7);
  }
`;

const ModalContabilizarHoras = ({ onClose, onAddSolicitacao }) => {
  const [categorias, setCategorias] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [comprovante, setComprovante] = useState(null);
  const [selectedAtividadeId, setSelectedAtividadeId] = useState("");
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Arquivo selecionado:", file.name);
      setComprovante(file);
    } else {
      console.log("Nenhum arquivo selecionado.");
    }
  };

  const handleSelectChange = (e) => {
    setSelectedAtividadeId(e.target.value);
  };

  const fetchAtividadesDaTabela = async () => {
    try {
      const response = await axios.get("https://scasa.ufc.br/api/categorias", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(response.data)) {
        setCategorias(response.data);
      } else {
        console.error("Formato inesperado:", response.data);
      }
    } catch (error) {
      console.log("Erro ao buscar categorias:", error.message);
    }
  };

  useEffect(() => {
    if (!token || !id) {
      console.error("Token ou ID não encontrados!");
      alert("Você precisa estar logado.");
      return;
    }
    fetchAtividadesDaTabela();
  }, [token, id]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("usuarioId", id);
    formData.append("tipoSolicitacao", "Contabilizar Horas");
    formData.append("descricao", descricao);
    formData.append("comprovante", comprovante);
    formData.append("atividadeTabela", selectedAtividadeId);

    try {
      console.log("atividade " + selectedAtividadeId)
      
      const response = await axios.post(
        `https://scasa.ufc.br/api/solicitacao/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Solicitação salva com sucesso:", response.data);
      Swal.fire({
        icon: "success",
        title: "Solicitação Enviada",
        text: "A solicitação foi enviada, aguarde a resposta.",
        confirmButtonColor: "#774fd1",
        customClass: {
          popup: "custom-swal-font",
        },
      }).then(() => {
        onAddSolicitacao(response.data);
        onClose(); 
      });
    } catch (error) {
      console.log("Erro ao salvar solicitação:", error.message);
      Swal.fire({
        icon: "error",
        title: "Erro ao Enviar",
        text: "Ocorreu um erro ao enviar a solicitação.",
        confirmButtonColor: "#774fd1",
        customClass: {
          popup: "custom-swal-font",
        },
      });
    }
  };

  return (
    <Overlay>
      <ContainerAdc onClick={(e) => e.stopPropagation()}>
        <HeaderContainer>
          <Header>Solicitação para Contabilizar Horas:</Header>
          <CloseIcon onClick={onClose} />
        </HeaderContainer>
        <Div>
          <Label>
            Indique a atividade correspondente da tabela <span>*</span>
          </Label>
          <select
            style={{ width: "90%", marginTop: "10px", marginBottom: "20px" }}
            onChange={handleSelectChange}
          >
            {categorias?.map((categoria) => (
              <optgroup key={categoria.categoria} label={categoria.categoria}>
                {categoria.atividades?.map((atividade) => (
                  <option key={atividade.id} value={atividade.codigo}>
                    {atividade.codigo} - {atividade.nome}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <Label>Descrição da Solicitação (opcional)</Label>
          <Textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <Label>
            Envie o comprovante correspondente <span>*</span>
          </Label>
          <FileUploadButton
            style={{
              backgroundColor: comprovante ? "#774fd1" : "#4b3e65",
              justifyContent: comprovante ? "flex-start" : "center",
              paddingLeft: comprovante ? "10px" : "0",
            }}
          >
            {comprovante ? (
              <>
                <MdOutlineFileUpload size={20} />
                <span
                  style={{
                    marginLeft: "10px",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                  }}
                >
                  {comprovante.name.length > 25
                    ? `${comprovante.name.substring(0, 25)}...`
                    : comprovante.name}
                </span>
                <input type="file" onChange={handleFileChange} />
              </>
            ) : (
              <>
                <MdOutlineFileUpload size={25} />
                Escolher Arquivo
                <input type="file" onChange={handleFileChange} />
              </>
            )}
          </FileUploadButton>
        </Div>
        <ContainerBotoes>
          <Button onClick={handleSave}>Salvar</Button>
        </ContainerBotoes>
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalContabilizarHoras;
