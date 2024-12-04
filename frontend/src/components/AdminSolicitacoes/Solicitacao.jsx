import { styled } from "styled-components";
import { lighten } from 'polished';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; 

import ModalCertificadoCurso from "./ModalCertificadoCurso";
import ModalCertificadoHoras from "./ModalCertificadoHoras";
import ModalConclusaoHoras from "./ModalConclusaoHoras";

const ContainerWrap = styled.div`
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 30px;
`;

const Titulo = styled.h2`
    background-color: #774FD1;
    padding: 10px;
    color: #ffff;
    font-family: 'Archivo', sans-serif;
    font-weight: 600;
    font-size: 22px;
    line-height: 30px;
    letter-spacing: 1px;
`;

const Descricao = styled.div`
    padding: 20px;
    background-color: #D3CEDE;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    & h3 {
        font-family: 'Archivo', sans-serif;
        font-weight: 600;
        font-size: large;
    }

    & p {
        font-family: 'Archivo', sans-serif;
        font-weight: 100;
        font-size: 20px;
        line-height: 1.2;
    }
`;

const ContainerInformacoesCurso = styled.div`
    background-color: #CCC5DF;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;

    & div {
        font-family: 'Archivo', sans-serif;
        font-weight: 600;
        font-size: 16px;
        display: flex;
        flex-direction: row;
        gap: 3px;
        align-items: center;
    }

    & h2 {
        font-family: 'Archivo', sans-serif;
        font-weight: 600;
        font-size: 18px;
        color: #8257E5;
    }
`;

const Botao = styled.button`
    font-family: 'Archivo', sans-serif;
    font-weight: 600;
    display: flex;
    text-transform: uppercase;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    background-color: ${({ cor }) => cor || '#47248F'};
    padding: 15px 20px;
    border-radius: 8px;
    border: none;
    color: #FFFFFF;
    margin: 10px;
    transition: 200ms;

    &:hover {
        cursor: pointer;
        background-color: ${({ cor }) => cor ? lighten(0.1, cor) : '#48248fb9'};
        transform: scale(1.05);  
    }
`;

const StatusDot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ status }) => {
        switch (status) {
            case 'Pendente':
                return 'yellow';
            case 'Rejeitado':
                return 'red';
            case 'Aceito':
                return 'green';
            default:
                return 'gray'; 
        }
    }};
`;

const H3 = styled.h3`
    font-family: 'Archivo', sans-serif;
    margin-left: 20px;
`;


const DataStyled = styled.h3`
    color: #8257E5;
    margin: 0; 
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ContentIntern = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px;

`;

const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #ffff;
  font-size: 20px;

  &:hover {
    color: ${lighten(0.1, '#774FD1')};
  }
`;

const Label = styled.h3`
  font-family: "Archivo", sans-serif;
  font-weight: 400;
  margin: 10px 0px;
`;


const P = styled.p`
    font-family: 'Archivo', sans-serif;
    color: #000000d5;
    font-size: 15px;
    margin: 4px;
`;

const Header = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  letter-spacing: 0.5px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  padding: 25px;
  color: #ffff;
  background-color: #774fd1;
  border-radius: 8px;
  text-transform: uppercase;
`;

const Solicitacao = ({ solicitacao }) => {
    const { id, data, status, tipoSolicitacao, descricao, motivo, certificado, comprovante } = solicitacao; 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDetalhesSolicitacao, setModalDetalhesSolicitacao] = useState(false);


    const openModalDetalhesSolicitacao = () => {
        setModalDetalhesSolicitacao(true);
    }
    const closeModalDetalhesSolicitacao = () => {
        setModalDetalhesSolicitacao(false)
    }

    const formatarData = (dataISO) => {
        const dataObj = new Date(dataISO);
        const opcoes = { day: '2-digit', month: 'numeric', year: 'numeric' }; 
        return dataObj.toLocaleDateString('pt-BR', opcoes); 
    };

    const visualizarComprovante = async (solicitacaoId) => {
        const token = localStorage.getItem('token'); 

        try {
            const response = await fetch(`http://localhost:3000/solicitacao/${solicitacaoId}/comprovante`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });

            if (response.ok) {
                const data = await response.json(); 
                const comprovanteUrl = data.comprovanteUrl; 
                window.open(comprovanteUrl); 
            } else {
                console.error('Erro ao visualizar o comprovante');
            }
        } catch (error) {
            console.error('Erro ao buscar o comprovante', error);
        }
    };


    const renderModal = () => {
        switch (solicitacao.tipoSolicitacao) {
            case "Certificado de Horas":
                return <ModalConclusaoHoras solicitacao={solicitacao} onClose={closeModalDetalhesSolicitacao} />;
            case "Certificado de Curso":
                return <ModalCertificadoCurso solicitacao={solicitacao} onClose={closeModalDetalhesSolicitacao} />;
            case "Contabilizar Horas":
                return <ModalCertificadoHoras solicitacao={solicitacao} onClose={closeModalDetalhesSolicitacao} />;
            default:
                console.warn("Tipo de solicitação desconhecido:", solicitacao.tipoSolicitacao);
                return null;
        }
    };

    return (
        <>
            <ContainerWrap>
                <Titulo>{tipoSolicitacao}</Titulo>
                <Descricao>
                    <H3>Descrição:</H3>
                    <P>{descricao}</P>
                </Descricao>
                <ContainerInformacoesCurso>
                    <div>
                        <H3>Data:</H3>
                        <DataStyled>{formatarData(data)}</DataStyled>
                    </div>
                    <div>
                        <H3>Status:</H3>
                        <StatusDot status={status} />
                        <P>{status}</P>
                    </div>
                    <Botao onClick={openModalDetalhesSolicitacao}>Detalhes</Botao>
                </ContainerInformacoesCurso>
            </ContainerWrap>

            {modalDetalhesSolicitacao && renderModal()}
            
        </>
    );
}

export default Solicitacao;
