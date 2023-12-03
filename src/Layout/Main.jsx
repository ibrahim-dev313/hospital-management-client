import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Shared/Shared/Footer';
import Navbar from '../Components/Shared/Shared/Navbar';
import { AuthContext } from '../Providers/AuthProvider';
import useAllBanners from '../hooks/useAllBanners';
import useProfile from '../hooks/useProfile';

const Main = () => {
    const [, , bannerlLading] = useAllBanners()
    const [userData, , profileLoading] = useProfile()
    const { user, loading } = useContext(AuthContext)
    // console.log(userData);
    return (
        <>
            {
                loading && profileLoading && bannerlLading && userData.length == 0 ? <div className='flex flex-col items-center justify-center min-h-screen gap-9'>
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