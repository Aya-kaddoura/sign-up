import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
export default function NavBar(){
    const cookie = new Cookies();
    const token = cookie.get("Bearer");
    const nav = useNavigate();
    async function handlLogOut(){
        await axios.post("http://127.0.0.1:8000/api/logout",null,{
            headers:{
                Authorization: "Bearer " + token,
            },
        });
        cookie.remove("Bearer");
        nav('/');
    }
    return(
        <div className="nav-bar">
            <div style={{display:"flex",color:"#fff"}}>
                <Link to="/" style={{marginRight:'10px',color:"#fff",textDecoration:'none'}}>Home</Link>
                <Link to="/About" style={{marginRight:'10px',color:"#fff",textDecoration:'none'}}>About</Link>
            </div>
            <div>
            {!token ? (
                    <>
                        <Link to="/login" className="register">Log In</Link>
                        <Link to="/signup" className="register">Sing Up</Link>
                    </>
                    ) : (
                    <>
                        <Link to="/dashboard" className="register">DashBoard</Link>
                        <Link className="register" onClick={handlLogOut}>Log Out</Link>
                    </>
                    )
                }
            </div>
                
        </div>
    )
}