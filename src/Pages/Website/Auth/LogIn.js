import axios from "axios";
import { useContext, useState } from "react";
import "../../../Form.css";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import Cookies from "universal-cookie";



export default function Form(props){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [accept,setAccept] = useState(false);
    const [fetchError,setFetchError] = useState("");
    const userNow = useContext(User);
    const nav = useNavigate();
    const cookie = new Cookies();
    // console.log(userNow);

    async function submit(e){
        e.preventDefault();
        setAccept(true);

        try {
            let res = await axios.post('http://127.0.0.1:8000/api/login',{
                email:email,
                password:password,
            })
            const token = res.data.data.token;
            const userDetails = res.data.data.user;
            userNow.setAuth({token,userDetails});
            cookie.set("Bearer",token);
            nav("/dashboard");
        
        }catch(err){
            if(err.responce.status === 401){
                setFetchError(true)
            }
            setAccept(true)
        }
    }

    
    
    return(
        <div className="imgBG">
            <NavBar/>
            <div className="my-form">
                <form onSubmit={submit}>
                    
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}/>
                    {accept && fetchError===401 && (<p className="error">The email is alraedy beeen taken</p>)}
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}/>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    )
}