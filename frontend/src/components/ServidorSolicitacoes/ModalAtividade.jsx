import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
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
  width: 30%;
  padding: 10px 15px;
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

const Textarea = styled.textarea`
  font-family: "Archivo", sans-serif;
  font-weight: 100;
  font-size: 12px;
  width: 90%;
  height: 80px;
  padding: 10px;
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

const Select = styled.select`
  font-family: "Archivo", sans-serif;
  font-weight: 100;
  color: #000;
  border: 1px solid #ccc;
  width: 90%;
  height: 30px;
  padding-left: 4px;
  margin-bottom: 8px;
  border-radius: 6px;
  background-color: #f2eeee;

  &:focus {
    border-color: #774fd1;
    outline: none;
    box-shadow: 0 0 2px rgba(119, 79, 209, 0.7);
  }
`;

const ModalAtividade = ({ onClose, onAddSolicitacao }) => {
  const [atividades, setAtividades] = useState([]);
  const [cursoId, setCursoId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categorias, setCategorias] = useState([]);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  

  const fetchAtividades = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/atividade/${id}/atividades`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAtividades(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchAtividadesDaTabela = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categorias", {
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
    fetchAtividades();
    fetchAtividadesDaTabela();
  }, []);

  const handleSave = async () => {
    const usuarioId = id;

    try {
      const novaSolicitacao = {
        usuarioId: usuarioId,
        tipoSolicitacao: "Certificado de Curso",
        cursoId: cursoId,
        descricao: descricao,
      };

      console.log("Payload enviado:", novaSolicitacao);

      const response = await axios.post(
        `http://localhost:3000/solicitacao/`,
        novaSolicitacao,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
          <Header>Solicitação de Conclusão de Atividade:</Header>
          <CloseIcon onClick={onClose} />
        </HeaderContainer>
        <Div>
          <Label>
            Indique o nome da atividade <span>*</span>
          </Label>
          <Select
            name="nomeCurso"
            value={cursoId}
            onChange={(e) => setCursoId(e.target.value)}
          >
            <option value="">Selecione uma atividade:</option>
            {atividades.map((atividade) => (
              <option key={atividade.id} value={atividade.id}>
                {atividade.titulo}
              </option>
            ))}
          </Select>

          <Label>Adicione uma breve descrição (opcional)</Label>
          <Textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Div>
        <ContainerBotoes>
          <Button onClick={handleSave}>Salvar</Button>
        </ContainerBotoes>
      </ContainerAdc>
    </Overlay>
  );
};

export default ModalAtividade;
