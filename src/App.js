import {  Route, Routes } from "react-router-dom";
//Dashboard
import DashBoard from "./Pages/Dashboard/DashBoard";
// Users
import Users from "./Pages/Dashboard/Users/Users";
import CreateUser from "./Pages/Dashboard/Users/CreateUser"
import EditeUser from "./Pages/Dashboard/Users/EditeUser";
//Products
import Products from "./Pages/Dashboard/Products/Products";
import CreateProduct from "./Pages/Dashboard/Products/CreateProduct";
import UpdateProduct from "./Pages/Dashboard/Products/UpdateProduct";
//Website
import Home from "./Pages/Website/Home";
//Auth
import SignUp from "./Pages/Website/Auth/SignUp";
import LogIn from "./Pages/Website/Auth/LogIn";
import RequireAuth from "./Pages/Website/Auth/RequireAuth";
import PersistLogin from "./Pages/Website/Auth/PersistLogin";

export default function App(){
    return(
        <div>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/login" element={<LogIn />}/>
                <Route element={<PersistLogin /> }>
                    <Route element={<RequireAuth />}>
                        <Route path="/dashboard" element={<DashBoard />}>
                            <Route path="users" element={<Users />}/>
                            <Route path="users/:id" element={<EditeUser />} />
                            <Route path="user/create" element={<CreateUser />}/>
                            <Route path="products" element={<Products />}/>
                            <Route path="products/:id" element={<UpdateProduct />}/>
                            <Route path="product/create" element={<CreateProduct />}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}