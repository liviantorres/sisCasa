import { useNavigate, Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { IoHomeOutline, IoChatbubbleEllipsesOutline, IoPersonAddOutline, IoLogOutOutline } from "react-icons/io5";
import { ImFileText2 } from "react-icons/im";
import { LuLayoutDashboard } from "react-icons/lu";
import LogoutModal from "../pages/Sair"; 
import { useState } from "react";

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

const IconLogoutWrapper = styled.div`
  svg {
    width: 35px;
    height: 35px;
    color: #fff;
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
      color: #de2d41;
      transform: scale(1.1);
    }
  }
`;

const Sidebar = ({ type }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowModal(false);
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  let navItems;

  if (type === "admin") {
    navItems = [
      { path: "/admin", label: "Home", icon: <IoHomeOutline size={35} color="#fff" /> },
      { path: "/admin/solicitacoes", label: "Solicitações", icon: <IoChatbubbleEllipsesOutline size={35} color="#fff" /> },
      { path: "/admin/usuarios", label: "Usuarios", icon: <IoPersonAddOutline size={35} color="#fff" /> },
      { path: "/admin/tabela", label: "Tabela de Pontos", icon: <LuLayoutDashboard size={35} color="#fff" /> },
    ];
  } else if (type === "pep") {
    navItems = [
      { path: "/pep", label: "Home", icon: <IoHomeOutline size={35} color="#fff" /> },
      { path: "/pep/cursos", label: "Cursos", icon: <ImFileText2 size={35} color="#fff" /> },
      { path: "/pep/solicitacoes", label: "Solicitacoes", icon: <IoChatbubbleEllipsesOutline size={35} color="#fff" /> },
      { path: "/pep/tabela", label: "Tabela", icon: <LuLayoutDashboard size={35} color="#fff" /> },
    ];
  } else if (type === "servidor") {
    navItems = [
      { path: "/servidor", label: "Home", icon: <IoHomeOutline size={35} color="#fff" /> },
      { path: "/servidor/cursos", label: "Cursos", icon: <ImFileText2 size={35} color="#fff" /> },
      { path: "/servidor/solicitacoes", label: "Solicitações", icon: <IoChatbubbleEllipsesOutline size={35} color="#fff" /> },
    ];
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

      <div className="icon-sair" onClick={() => setShowModal(true)}>
        <IconLogoutWrapper>
          <IoLogOutOutline size={25} />
        </IconLogoutWrapper>
      </div>

      {showModal && (
        <LogoutModal onCancel={handleCancelLogout} onConfirm={handleConfirmLogout} />
      )}
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Sidebar;
