import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useProfile from "../../../hooks/useProfile";

const Navbar = () => {
    const { user, logout, photoURL, loading } = useContext(AuthContext)
    const [userData, , profileLoading] = useProfile()
    const [isAdmin] = useAdmin();
    // console.log(loading);
    // console.log(userData);
    const handleLogOut = () => {
        logout()
            .then(toast.success("Logged Out Successfully"))
            .catch()
    }
    const navOptions = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/alltests'>All Tests</NavLink></li>
        <li><NavLink to='/about-us'>About Us</NavLink></li>
        <li><NavLink to='/blogs'>Blogs</NavLink></li>
        <li><NavLink to='/rnd'>Our Research</NavLink></li>

        {
            user && isAdmin && <li><Link to="/admin">Admin Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to="/dashboard">User Dashboard</Link></li>
        }


        {
            user?.email ?
                <>

                    <li><button className="" onClick={handleLogOut}>Log Out</button></li>
                </> :
                <li ><NavLink to='/login' className="flex items-center ">Login</NavLink></li>
        }

    </>

    return (
        <>
            <div className="bg-green-50 navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}


                        </ul>
                    </div>
                    <Link to='/' className="h-full text-xl normal-case btn btn-ghost">
                        Al Shifa Diagnostics
                    </Link>
                </div>
                <div className="hidden navbar-center lg:flex">
                    <ul className="px-1 menu menu-horizontal">
                        {navOptions}
                    </ul>
                </div>
                <div className=" navbar-end lg:flex">
                    {
                        user?.email ?
                            <>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar tooltip tooltip-left" data-tip={user?.displayName}>

                                        <img className="w-10 rounded-full " src={photoURL || user?.photoURL} />

                                    </label>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

                                        {
                                            user?.email ?
                                                <>
                                                    <li><NavLink to='/dashboard/my-profile'>My Profile</NavLink></li>


                                                    <li><button className="" onClick={handleLogOut}>Log Out</button></li>
                                                </> :
                                                <></>
                                        }
                                    </ul>
                                </div>
                            </> : <></>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;