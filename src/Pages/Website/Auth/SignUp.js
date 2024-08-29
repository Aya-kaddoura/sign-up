import axios from "axios";
import { useContext, useState } from "react";
import '../../../Form.css';
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar";
import Cookies from "universal-cookie";

export default function Form(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordR,setPasswordR] = useState("");
    const [accept,setAccept] = useState(false);
    const [fetchError,setFetchError] = useState("");
    const userNow = useContext(User);
    const nav = useNavigate();
    const cookie = new Cookies();

    async function submit(e){
        let flag = true;
        e.preventDefault();
        setAccept(true);
        if(name.length<1 || password.length<8 || password !== passwordR){
            flag = false;
        }
        try {if(flag){
            let res = await axios.post(`http://127.0.0.1:8000/api/register`,{
                name:name,
                email:email,
                password:password,
                password_confirmation:passwordR,
            })
            const token = res.data.data.token;
            const userDetails = res.data.data.user;
            userNow.setAuth({token,userDetails});
            cookie.set("Bearer",token)
            nav("/dashboard")
        }
        }catch(err){
            setFetchError(err.response.status)
        }
    }

    
    return(
        <div className="imgBG">
            <NavBar/>
            <div className="my-form">
                <form onSubmit={submit}>
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
                    {accept && fetchError===422 && (<p className="error">The email is alraedy been taken</p>)}
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
                    <button type="submit">Regester</button>
                </form>
            </div>
        </div>
    )
}




// import NavBar from "../../../components/NavBar";
// import Form from "../../../components/Form/Form";

// export default function SignUp(){
    

//     return(
//         <div className="imgBG">
//             <NavBar/>
//             <Form button='Regester' navigate='' endpoint='register' haslocalstorage={true}/> 
//         </div>
//     )
// }