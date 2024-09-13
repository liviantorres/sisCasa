import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import PropTypes from 'prop-types'

const SidebarContainer = styled.div`
    width: 90px;
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
        & img{
                width: 30px;
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
            & img{
                width: 40px;
            }
        }
    }
`;

const adminNavItems = [
    { path: "/admin", label: "Home", icon: "./home-admin.svg" },
    { path: "/admin/cursos", label: "Cursos", icon: "./solicitacoes-admin.svg" },
    { path: "/admin/progresso", label: "Progresso", icon: "./addusuario-admin.svg" },
];

const pepNavItems = [
    { path: "/pep", label: "Home", icon: "./home.svg" },
    { path: "/pep/cursos", label: "Cursos", icon: "./cursos.svg" },
    { path: "/pep/progresso", label: "Progresso", icon: "./progresso.svg" },
    { path: "/pep/tabela", label: "Tabela", icon: "./tabela.svg" },
];
/*
const servidorNavItems = [
    { path: "/home-admin", label: "Home", icon: "./home-admin.svg" },
    { path: "/home-admin/cursos", label: "Cursos", icon: "./cursos-admin.svg" },
    { path: "/home-admin/progresso", label: "Progresso", icon: "./progresso-admin.svg" },
];
*/

const Sidebar = ({type}) => {
    let navItems;
    

    if(type === 'admin'){
        navItems = adminNavItems;
    }else if (type === 'pep'){
        navItems = pepNavItems;
    }else{
        navItems = [];
    }
    console.log("teste" + navItems);

    return (
        <SidebarContainer>
            <Link className="logo" to={"/home-pep"}>
                <img src="./logo-siscasa2.svg" alt="" />
            </Link>
            <nav>
                <ul>
                    {navItems.map((item, index) => (
                       
                        <li key={index}>
                            <NavLink to={item.path}>
                                <img src={item.icon} alt={item.label} />
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <Link className="icon-sair" to={"/sair"}>
                <img src="./sair.svg" alt="" />
            </Link>
        </SidebarContainer>
    );
};

Sidebar.propType = {
    type: PropTypes.string.isRequired,
}

export default Sidebar;
