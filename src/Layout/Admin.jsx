import { NavLink, Outlet } from 'react-router-dom';

const Admin = () => {
    return (
        <div className='flex'>
            <div className="w-64 min-h-screen bg-green-200">
                <h1 className="px-4 pt-4 font-bold text-center no-animation btn-block">AL Shifa Diagnostics</h1>
                <div className='divider'></div>
                <h1 className="px-4 pb-4 font-bold text-center no-animation btn-block">Dashboard</h1>

                <ul className="font-semibold menu">
                    <li><NavLink to={'all-users'}>All Users</NavLink></li>
                    <li><NavLink to={'add-test'}>Add Test</NavLink></li>
                    <li><NavLink to={'all-tests'}>All Tests</NavLink></li>
                    <li><NavLink to={'add-banner'}>Add Banner</NavLink></li>
                    <li><NavLink to={'all-banners'}>All Banners</NavLink></li>
                </ul>
                <div className='divider'></div>
                <ul className="font-semibold menu">
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/dashboard/appointments'}>Appointments</NavLink></li>
                    <li><NavLink to={'/dashboard/appointments'}>Test Results</NavLink></li>
                </ul>
            </div>

            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Admin;