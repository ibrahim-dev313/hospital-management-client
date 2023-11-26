import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import UserDashboard from "../Layout/UserDashboard";
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
]);
export default router;