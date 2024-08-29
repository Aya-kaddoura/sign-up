import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "../../../Form.css";
import { User } from "../../Website/Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function EditeUser(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordR,setPasswordR] = useState("");
    const [accept,setAccept] = useState(false);
    const [fetchError,setFetchError] = useState("");
    // const userNow = useContext(User);
    // const token = userNow.auth.token;
    const nav = useNavigate();
    const cookie = new Cookies();
    const token = cookie.get("Bearer")

    let id = window.location.pathname.split("/").slice(-1)[0];
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/user/showbyid/${id}`,{
            headers:{
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        })
        .then((data)=>{
            setName(data.data[0].name);
            setEmail(data.data[0].email);
        })
    },[])

    
    async function submit(e){
        let flag = true;
        e.preventDefault();
        setAccept(true);
        if(name.length<1 || password.length<8 || password !== passwordR){
            flag = false;
        }
        try {if(flag){
            let res = await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`,{
                name:name,
                email:email,
                password:password,
                password_confirmation:passwordR,
            },{
                headers:{
                    Authorization: "Bearer " + token,
                }
            })
            nav("/dashboard/users")
        }
        }catch(err){
            setFetchError(err.response.status)
        }
    }
    const formsteyl = {textAlign:'left',height: 'auto'};
    const labelstyle = {color:"#261633",border:'none',width:'70%', fontSize:'1.2em',fontWeight: '500'};
    const inputstyle = {color:'#545454',border:'solid 1px #545454',borderRadius:'5px',padding:'10px',fontSize:'15px'};
    const buttonstyle = {color:'#fff', backgroundColor:'#261633',padding:'10px',fontSize:'20px'}
    
    
    return(
        <div style={{marginTop:"10px"}}>
            <div className="my-form" style={formsteyl}>
                <form onSubmit={submit} style={labelstyle}>
                    <label htmlFor="name">Name</label>
                    <input
                        style={inputstyle}
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e)=> setName(e.target.value)} />
                        {/* {accept && name.length<1 && <p className="error">Name is required</p>} */}
                    <label htmlFor="email">Email</label>
                    <input
                        style={inputstyle}
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}/>
                    {accept && fetchError===422 && (<p className="error">The email is alraedy beeen taken</p>)}
                    <label htmlFor="password">Password</label>
                    <input
                        style={inputstyle}
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}/>
                        {/* {accept && password.length<4 && <p className="error">the password should be longer</p>} */}
                    <label htmlFor="passwordR">Repeat Password</label>
                    <input
                        style={inputstyle}
                        id="passwordR"
                        type="password"
                        value={passwordR}
                        onChange={(e)=> setPasswordR(e.target.value)}/>
                        {/* {accept && password!== passwordR && <p className="error">password dosn't match</p>} */}
                    <button style={buttonstyle} type="submit">Update</button>
                </form>
            </div>
        </div>
    )
}
















// import { useEffect, useState } from "react";
// import Form from "../../../components/Form/Form";

// export default function SEditeUser(){
//     const [name,setName] = useState("");
//     const [email,setEmail] = useState("");
    

//     
    
//     return(
//         <div style={{textAlign:'center'}}>
//             <h1 style={{margin:'0',paddingTop:'40px'}}>Update User</h1>
//             <Form name={name} email={email} button='Update' navigate='dashboard/users' endpoint={`user/update/${id}`} updatestyle={true}/> 
//         </div>
//     )
// }