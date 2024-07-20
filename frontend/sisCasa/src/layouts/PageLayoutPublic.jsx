import Home from "../pages/Home";
import { Outlet } from "react-router-dom";

const PageLayoutPublic = () => {
    return (  
        <>
            <Outlet/>
        </>
    );
}
 
export default PageLayoutPublic;