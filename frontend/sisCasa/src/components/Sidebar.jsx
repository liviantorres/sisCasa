import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

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

const Sidebar = () => {
    return (
        <SidebarContainer>
            <Link className="logo" to={"/home-pep"}>
                <img src="./logo-siscasa2.svg" alt="" />
            </Link>
            <nav>
                <ul>
                    <li>
                        <NavLink to={"/home-pep"} exact>
                            <img src="./home.svg" alt="Home" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/home-pep/cursos-pep"}>
                            <img src="./cursos.svg" alt="Seus cursos" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/home-pep/progresso-pep"}>
                            <img src="./progresso.svg" alt="Seu progresso" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/home-pep/tabela-pep"}>
                            <img src="./tabela.svg" alt="Tabela de pontos" />
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
