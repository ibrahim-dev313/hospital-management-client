import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    // console.log(location);
    if (loading) {
        return <div className='flex flex-col items-center justify-center min-h-screen gap-9'>
            <span className="flex items-center justify-center w-32 text-green-800 loading loading-bars "></span>
            <h1 className='text-4xl font-bold'>Welcome To Your Personal Dashboard</h1>
            <h1 className='flex gap-3 text-3xl'>Please Wait <span className="text-green-700 loading loading-dots loading-lg"></span></h1>
        </div>

    }
    if (user?.email) {
        return children
    }
    return <Navigate state={location.pathname} to={'/login'} replace></Navigate>
};

export default PrivateRoute;