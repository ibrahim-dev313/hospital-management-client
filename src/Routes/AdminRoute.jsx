import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, , data, adminLoading] = useAdmin();
    const location = useLocation();
    console.log(data);
    if (loading && adminLoading) {
        // Loading state, you can show a loading spinner or message
        return (
            <div className='flex flex-col items-center justify-center min-h-screen gap-9'>
                <span className="flex items-center justify-center w-32 text-green-800 loading loading-bars"></span>
                <h1 className='text-4xl font-bold'>Welcome To Your Admin Dashboard</h1>
                <h1 className='flex gap-3 text-3xl'>Please Wait <span className="text-green-700 loading loading-dots loading-lg"></span></h1>
            </div>
        );
    }


    else if (!loading && user?.email && data == 'admin') {
        return children;
    }
    else if (!user?.email && !data) {
        return <Navigate state={location.pathname} to='/login' replace />;
    }



};

export default AdminRoute;
