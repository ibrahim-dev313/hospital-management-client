import { NavLink, Outlet } from 'react-router-dom';
import Loader from '../Components/Loader';
import useProfile from '../hooks/useProfile';

const UserDashboard = () => {
    const [userData, , loading] = useProfile()
    // console.log(userData);
    return (
        <>
            {
                userData && loading ? <Loader></Loader> : <div className='flex'>
                    <div className="w-64 min-h-screen bg-green-200">
                        <h1 className="px-4 pt-4 font-bold text-center no-animation btn-block">AL Shifa Diagnostics</h1>
                        <div className='divider'></div>
                        <h1 className="px-4 pb-4 font-bold text-center no-animation btn-block">Dashboard</h1>

                        <ul className="font-semibold menu">
                            <li><NavLink to={'my-profile'}>My Profile</NavLink></li>
                            <li><NavLink to={'appointments'}>Appointments</NavLink></li>
                            <li><NavLink to={'test-results'}>Test Results</NavLink></li>
                        </ul>
                        <div className='divider'></div>
                        <ul className="font-semibold menu">
                            <li><NavLink to={'/'}>Home</NavLink></li>

                        </ul>
                    </div>

                    <div className="flex-1 p-8">
                        <Outlet></Outlet>
                    </div>
                </div>
            }
        </>
    );
};

export default UserDashboard;