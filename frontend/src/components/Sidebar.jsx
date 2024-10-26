import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { IoHomeOutline } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { ImFileText2 } from "react-icons/im";



const SidebarContainer = styled.div`
    width: 70px;
    height: 100vh;
    background-color: #6d4abc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & .logo {
        background-color: #8257e5;
        width: 100%;
        display: flex;
        justify-content: center;
        img {
            width: 50px;
            height: auto; 
            padding: 10px;
        }
    }

    & .icon-sair {
        padding-bottom: 15px;
        & img {
            width: 25px;
            transition: filter 0.3s ease;
        }
        &:hover img {
            filter: brightness(0) saturate(100%) invert(44%) sepia(76%) saturate(800%) hue-rotate(-4deg);
        }
    }

    & nav ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 18px;

        & a {
            opacity: 0.5; 
            transition: opacity 0.4s; 
            &:hover {
                opacity: 1; 
            }
            &.active {
                opacity: 1; 
            }
            & img {
                width: 35px;
            }
        }
    }
`;

const IconLogoutWrapper = styled(Link)` 
    svg {
        width: 35px;  
        height: 35px;
        color: #fff;  
        transition: color 0.3s ease, transform 0.3s ease;

        &:hover {
            color: #DE2D41;  
            transform: scale(1.1); 
        }
    }

`;


const IconWrapper = styled.div`
    svg {
        width: 35px; 
        height: 35px;
        color: #fff;  
        transition: color 0.3s ease, transform 0.3s ease;

        &:hover {
            color: #ddd; 
            transform: scale(1.1);  
        }
    }
`;


const adminNavItems = [
    { path: "/admin", label: "Home", icon: <IconWrapper><IoHomeOutline size={35} color="#fff"/> </IconWrapper> },
    { path: "/admin/solicitacoes", label: "Solicitações", icon: <IconWrapper> <IoChatbubbleEllipsesOutline size={35} color="#fff"/> </IconWrapper> },
    { path: "/admin/usuarios", label: "Usuarios", icon: <IconWrapper><IoPersonAddOutline size={35} color="#fff"/></IconWrapper> },
];

const pepNavItems = [
    { path: "/pep", label: "Home", icon: <IconWrapper><IoHomeOutline size={35} color="#fff"/> </IconWrapper> },
    { path: "/pep/cursos", label: "Cursos", icon: <IconWrapper><ImFileText2 size={35} color="#fff"/></IconWrapper> },
    { path: "/pep/solicitacoes", label: "Solicitacoes", icon: <IconWrapper> <IoChatbubbleEllipsesOutline size={35} color="#fff"/> </IconWrapper>},
    { path: "/pep/progresso", label: "Progresso", icon: "./progresso.svg" },
    { path: "/pep/tabela", label: "Tabela", icon: "./tabela.svg" },
];

const Sidebar = ({ type }) => {
    let navItems;

    if (type === 'admin') {
        navItems = adminNavItems;
    } else if (type === 'pep') {
        navItems = pepNavItems;
    } else {
        navItems = [];
    }

    return (
        <SidebarContainer>
            <Link className="logo">
                <img src="./logo-siscasa2.svg" alt="" />
            </Link>
            <nav>
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <NavLink to={item.path} activeClassName="active" end>
                               {item.icon}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <Link className="icon-sair" to={"/sair"}>
               <IconLogoutWrapper> <IoLogOutOutline size={25}/> </IconLogoutWrapper>
            </Link>
        </SidebarContainer>
    );
};

Sidebar.propTypes = {
    type: PropTypes.string.isRequired,
};

export default Sidebar;
