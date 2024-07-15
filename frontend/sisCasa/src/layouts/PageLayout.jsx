import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const PageLayout = () => {
    const LayoutContainer = styled.div`
    display: flex;
    height: 100vh;
`;
    return (
        <div>
        <LayoutContainer>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px' }}>
                <Outlet />
           
            </div>
        </LayoutContainer>
        </div>
    );
};

export default PageLayout;
