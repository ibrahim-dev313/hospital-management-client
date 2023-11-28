import { createBrowserRouter } from "react-router-dom";
import Admin from "../Layout/Admin";
import Main from "../Layout/Main";
import UserDashboard from "../Layout/UserDashboard";
import AddBanner from "../Pages/Admin/AddBanner";
import AddTest from "../Pages/Admin/AddTest";
import AllBanners from "../Pages/Admin/AllBanners";
import AllTests from "../Pages/Admin/AllTests";
import AllUsers from "../Pages/Admin/AllUsers";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home";
import MyProfile from "../Pages/UserDashboard/MyProfile";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,

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
        element: <PrivateRoute><UserDashboard></UserDashboard></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyProfile />
            }
        ]
    },
    {
        path: "/admin",
        element: <Admin></Admin>,
        children: [
            {
                path: 'all-users',
                element: <AllUsers />
            },
            {
                path: 'add-test',
                element: <AddTest />
            },
            {
                path: 'add-banner',
                element: <AddBanner />
            },
            {
                path: 'all-tests',
                element: <AllTests />
            },
            {
                path: 'all-banners',
                element: <AllBanners />
            },
        ]
    },
]);

export default router;