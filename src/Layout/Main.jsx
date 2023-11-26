import { Outlet } from 'react-router-dom';
import Footer from '../Components/Shared/Shared/Footer';
import Navbar from '../Components/Shared/Shared/Navbar';

const Main = () => {
    return (
        <>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default Main;