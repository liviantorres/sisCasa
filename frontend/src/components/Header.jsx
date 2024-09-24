import { styled } from "styled-components";
import { useNavigate } from "react-router-dom"; 
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";


const ContainerWrap = styled.div`
        display: flex;
        justify-content: end;
        font-family: 'Archivo', sans-serif;
        height:5%;
        margin: 0;
       
    `;

    const ContainerUsuario = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        & .usuario{
            width: 50px;
            &:hover{
                cursor: pointer; 
            }
        }
        & .seta{
            width: 30px;
            &:hover{
                cursor: pointer;
            }
        }
    `;

const User = styled(FaRegUserCircle)`
    color: #774FD1;
    cursor: pointer;
    & :hover{
        color: #3a246d;
    }
`

const Seta = styled(IoIosArrowDown)`
    color: #774FD1;
    cursor: pointer;
    & :hover{
        color: #3a246d;
    }
`;
    
const Header = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/admin/perfil'); 
    };

    return ( 
        <>
            <ContainerWrap>
                <ContainerUsuario>
                    <User size={45} onClick={handleProfileClick}/>
                    <Seta size={25} onClick={handleProfileClick}/>
                </ContainerUsuario>
            </ContainerWrap>
        </>
     );
}
 
export default Header;