import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import TalvoLanding from "./features/Landing/pages/TalvoLanding";
import Home from "./features/interview/pages/Home";
import Protected from "./features/auth/components/Protected";
import Loader from "./features/auth/components/Loader";
import AnalysisLoading from "./features/interview/components/AnalysisLoading";
import AnalysisReport from "./features/interview/pages/AnalysisReport";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<TalvoLanding/>
    },
    {
        path: "/login",
        element:<Login/>
    },
    {
        path: "/register",
        element:<Register/>
    },
    {
        path: "/home",
        element: <Protected><Home/></Protected>
    },
    {
        path: "/interview/:interviewID",
        element: <Protected><AnalysisReport/></Protected>
    }
])