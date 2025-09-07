import {Container} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {Outlet} from "react-router";

function DefaultLayouts() {
    return (
        <>
            <Navbar/>
                <Container sx={{minHeight: '80vh', mt: 2, mb: 2}}>
                <Outlet/>
                </Container>
            <Footer/>
        </>
    );
}

export default DefaultLayouts;