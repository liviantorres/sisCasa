import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
    width: 100px;
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
    }

    & nav ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 18px;

        & li {
            &:hover {
                opacity: 1; 
            }
        }

        & a {
            opacity: 0.5; 
            transition: opacity 0.4s; 

            &.active {
                opacity: 1; 
            }
        }
    }
`;

const Sidebar = () => {
    return (
        <SidebarContainer>
            <Link className="logo" to={"/"}>
                <img src="./logo-siscasa2.svg" alt="" />
            </Link>
            <nav>
                <ul>
                    <li>
                        <NavLink to={"/"} exact>
                            <img src="./home.svg" alt="" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/cursos"}>
                            <img src="./cursos.svg" alt="" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/progresso"}>
                            <img src="./progresso.svg" alt="" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/tabela"}>
                            <img src="./tabela.svg" alt="" />
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Link className="icon-sair" to={"/sair"}>
                <img src="./sair.svg" alt="" />
            </Link>
        </SidebarContainer>
    );
};

export default Sidebar;
