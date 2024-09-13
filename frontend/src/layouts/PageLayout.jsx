import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import PropTypes from 'prop-types'

const LayoutContainer = styled.div`
display: flex;
height: 100vh;
`;

const PageLayout = ({userType}) => {
  
    return (
        
        <LayoutContainer>
            <Sidebar type = {userType}/>
            <div style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </div>
        </LayoutContainer>
       
    );
};

PageLayout.propTypes = {
    userType: PropTypes.string.isRequired,
}

export default PageLayout;
