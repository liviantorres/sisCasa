import React from 'react';
import { styled } from "styled-components";


const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: relative;  
  background-color: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-size: 22px;
  color: #000;
  text-align: center;
`;

const Button = styled.button`
  background-color: #774fd1;
  font-family: "Archivo", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  width: 100px;
  height: 2.5rem;
  border-radius: 8px;
  border: none;
  color: white;
  margin: 10px;
  transition: 200ms;
  &:hover {
    cursor: pointer;
    background-color: #653bb1;
    transform: scale(1.05);
  }
`;

const CloseIcon = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #774fd1;
  position: absolute;
  size: 30px;
  top: 10px;
  right: 20px;  
  cursor: pointer;
`;


const ModalSelecionarTipo = ({ onClose, onSelect }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <CloseIcon onClick={onClose}>&times;</CloseIcon>
        <ModalHeader>Selecione o tipo de atividade</ModalHeader>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          <Button onClick={() => onSelect('edital')}>Edital</Button>
          <Button onClick={() => onSelect('curso')}>Curso</Button>
        </div>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalSelecionarTipo;
