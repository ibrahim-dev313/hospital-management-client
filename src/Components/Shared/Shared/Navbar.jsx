import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

const Navbar = () => {
    const { user, logout, photoURL } = useContext(AuthContext)

    const handleLogOut = () => {
        logout()
            .then(toast.success("Logged Out Successfully"))
            .catch()
    }
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/dashboard'>Dashboard</NavLink></li>



                            {
                                user?.email ?
                                    <>

                                        <li><button className="" onClick={handleLogOut}>Log Out</button></li>
                                    </> :
                                    <li ><NavLink to='/login' className="flex items-center ">Login</NavLink></li>
                            }
                        </ul>
                    </div>
                    <Link to='/' className="h-full text-xl normal-case btn btn-ghost">
                        <img className="h-12 text-2xl font-bold" src="https://i.ibb.co/dj88QYw/20231106-225521-0000-removebg-preview.png" alt="" /> SpaceJobs
                    </Link>
                </div>
                <div className="hidden navbar-center lg:flex">
                    <ul className="px-1 menu menu-horizontal">
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>



                        {
                            user?.email ?
                                <>

                                    <li><button className="" onClick={handleLogOut}>Log Out</button></li>
                                </> :
                                <li ><NavLink to='/login' className="flex items-center justify-center">Login</NavLink></li>
                        }
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