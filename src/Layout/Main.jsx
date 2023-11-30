import { Outlet } from 'react-router-dom';
import Footer from '../Components/Shared/Shared/Footer';
import Navbar from '../Components/Shared/Shared/Navbar';
import useAllBanners from '../hooks/useAllBanners';

const Main = () => {
    const [, , loading] = useAllBanners()
    // console.log(loading);
    return (
        <>
            {
                loading ? <div className='flex flex-col items-center justify-center min-h-screen gap-9'>
                    <span className="flex items-center justify-center w-32 text-green-800 loading loading-bars "></span>
                    <h1 className='text-4xl font-bold'>Welcome To Al Shifa Diagnostics</h1>
                    <h1 className='flex gap-3 text-3xl'>Please Wait <span className="text-green-700 loading loading-dots loading-lg"></span></h1>
                </div>
                    : <>
                        <Navbar></Navbar>
                        <Outlet></Outlet>
                        <Footer></Footer></>

            }
        </>
    );
};

export default Main;