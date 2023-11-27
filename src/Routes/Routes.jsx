import { createBrowserRouter } from "react-router-dom";
import Admin from "../Layout/Admin";
import Main from "../Layout/Main";
import UserDashboard from "../Layout/UserDashboard";
import AddTest from "../Pages/Admin/AddTest";
import AllUsers from "../Pages/Admin/AllUsers";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home";
import MyProfile from "../Pages/UserDashboard/MyProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: () => fetch(`https://spacejobs-mi1357.vercel.app/jobs`)
            },

        ]
    },
    {
        path: "/register",
        element: <Register></Register>
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/dashboard",
        element: <UserDashboard></UserDashboard>,
        children: [
            {
                path: '/dashboard',
                element: < MyProfile />
            }
        ]
    },
    {
        path: "admin",
        element: <Admin></Admin>,
        children: [
            {
                path: 'admin',
                element: < AllUsers />
            },
            {
                path: 'add-test',
                element: < AddTest />
            },
        ]
    },
]);
export default router;