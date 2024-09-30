import styled from "styled-components";

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
  align-items: center;
  background-color: #fff;

  padding: 20px 0px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 40%;
  z-index: 1000;
`;

const Title = styled.h3`
    font-family: "Poppins", sans-serif;
    color: #8257E5;
`;

const Hr = styled.hr`
    border: none; 
    height: 1px; 
    width: 80%;
    background-color: rgba(130, 87, 229, 0.7); 
    margin: 10px 0; 
`;

const Botao = styled.button`
font-family: "Archivo", sans-serif;
font-weight: 600;
width: 20%;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 10px 20px;
  background-color: ${({cor})=> cor || '#C02929'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  margin: 20px;
  &:hover {
    background-color: ${({cor})=> cor ? '#177c44' : '#9d1a1a'};
  }
`;
const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ModalRemover = ({ onClose, onConfirm, atividade}) => {
    const confirmRemove = () =>{
      onConfirm(atividade)
    }
    return ( 
        <>
         <Overlay onClick={onClose}>
         <ContainerAdc onClick={(e) => e.stopPropagation()}>
            <Title>Tem certeza que deseja excluir essa atividade?</Title>
            <Hr></Hr>
            <ContainerBotoes>
            <Botao onClick={confirmRemove} cor='#1EB662'>Sim</Botao>
            <Botao onClick={onClose}>Não</Botao>
        </ContainerBotoes>
        </ContainerAdc>
         </Overlay>
        
        </>
     );
}

export default ModalRemover;