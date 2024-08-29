import { NavLink } from "react-router-dom";


export default function SideBar(){
    return(
        <div className="side-bar">
            <NavLink className="item-nav" activeclassname="active" to="users">
                <i className="fa-solid fa-users"></i> Users
            </NavLink>
            <NavLink className="item-nav" activeclassname="active" to="user/create">
                <i className="fa-solid fa-user-plus"></i> Create User
            </NavLink>
            <NavLink className="item-nav" activeclassname="active" to="products">
                <i className="fa-solid fa-brands fa-product-hunt"></i> Products
            </NavLink>
            <NavLink className="item-nav" activeclassname="active" to="product/create">
                <i className="fa-solid fa-plus"></i> Create Product
            </NavLink>
        </div>
    )
}