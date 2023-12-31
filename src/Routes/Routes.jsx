import { createBrowserRouter } from "react-router-dom";
import Admin from "../Layout/Admin";
import Main from "../Layout/Main";
import UserDashboard from "../Layout/UserDashboard";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AddBanner from "../Pages/Admin/AddBanner";
import AddTest from "../Pages/Admin/AddTest";
import AllBanners from "../Pages/Admin/AllBanners";
import AllTests from "../Pages/Admin/AllTests";
import AllUsers from "../Pages/Admin/AllUsers";
import Reservations from "../Pages/Admin/Reservations";
import AllTestsPage from "../Pages/AllTests/AllTestsPage";
import TestDetails from "../Pages/AllTests/TestDetails";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import BlogPage from "../Pages/BlogPage/BlogPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import ResearchPage from "../Pages/ResearchPage/ReserchPage";
import Appointments from "../Pages/UserDashboard/Appointments";
import MyProfile from "../Pages/UserDashboard/MyProfile";
import TestResults from "../Pages/UserDashboard/TestResults";
import AdminRoute from "./AdminRoute";
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
            {
                path: "/alltests",
                element: <AllTestsPage></AllTestsPage>,

            },
            {
                path: "/about-us",
                element: <AboutUs></AboutUs>,

            },
            {
                path: "/blogs",
                element: <BlogPage></BlogPage>,

            },
            {
                path: "/rnd",
                element: <ResearchPage></ResearchPage>,

            },
            {
                path: "/test/:id",
                element: <PrivateRoute><TestDetails></TestDetails></PrivateRoute>,

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
                path: '/dashboard/my-profile',
                element: <MyProfile />
            },
            {
                path: '/dashboard/appointments',
                element: <Appointments />
            },
            {
                path: '/dashboard/test-results',
                element: <TestResults />
            },
        ]
    },
    {
        path: "/admin",
        element: <AdminRoute><Admin></Admin></AdminRoute>,
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
                path: 'all-banners',
                element: <AllBanners />
            },
            {
                path: 'all-tests',
                element: <AllTests />
            },

            {
                path: 'reservations',
                element: <Reservations />
            },
        ]
    },
]);

export default router;