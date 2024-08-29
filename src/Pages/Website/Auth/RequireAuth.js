import { useContext } from "react"
import { User } from "../Context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
export default function RequireAuth(){
    const user = useContext(User);
    const location = useLocation();
    return user.auth ? (
    <Outlet/>
) : (
    <Navigate state={{form:location}} to="/login"/>
);
}