import axios from "axios";
import { useState } from "react";
// import "../../../Form.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Form(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordR,setPasswordR] = useState("");
    const [accept,setAccept] = useState(false);
    const [fetchError,setFetchError] = useState("");
    const cookie = new Cookies();
    const token = cookie.get("Bearer");
    const nav = useNavigate();

    async function submit(e){
        let flag = true;
        e.preventDefault();
        setAccept(true);
        if(name.length<1 || password.length<8 || password !== passwordR){
            flag = false;
        }
        try {if(flag){
            let res = await axios.post(`http://127.0.0.1:8000/api/user/create`,{
                name:name,
                email:email,
                password:password,
                password_confirmation:passwordR,
            },{
                headers:{
                    Authorization: "Bearer " + token
                }
            })
            nav("/dashboard/users")
        }
        }catch(err){
            setFetchError(err.response.status)
        }
    }

    
    return(
        <div style={{marginTop:"10px"}}>
            <div>
                <form className="create-Product" onSubmit={submit}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e)=> setName(e.target.value)} />
                        {/* {accept && name.length<1 && <p className="error">Name is required</p>} */}
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}/>
                    {accept && fetchError===422 && (<p className="error">The email is alraedy beeen taken</p>)}
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}/>
                        {/* {accept && password.length<4 && <p className="error">the password should be longer</p>} */}
                    <label htmlFor="passwordR">Repeat Password</label>
                    <input
                        id="passwordR"
                        type="password"
                        value={passwordR}
                        onChange={(e)=> setPasswordR(e.target.value)}/>
                        {/* {accept && password!== passwordR && <p className="error">password dosn't match</p>} */}
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}