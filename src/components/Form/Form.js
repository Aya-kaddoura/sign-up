// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import './Form.css';
// import { User } from "../../Pages/Website/Context/UserContext";
// import { useNavigate } from "react-router-dom";

// export default function Form(props){
//     const [name,setName] = useState("");
//     const [email,setEmail] = useState("");
//     const [password,setPassword] = useState("");
//     const [passwordR,setPasswordR] = useState("");
//     const [accept,setAccept] = useState(false);
//     const [fetchError,setFetchError] = useState("");
//     const userNow = useContext(User);
//     const nav = useNavigate();
//     // console.log(userNow);
//     useEffect(()=>{
//         setName(props.name);
//         setEmail(props.email)
//     },[props.name,props.email])
    
//     async function submit(e){
//         let flag = true;
//         e.preventDefault();
//         setAccept(true);
//         if(name.length<1 || password.length<8 || password !== passwordR){
//             flag = false;
//         }
//         try {if(flag){
//             let res = await axios.post(`http://127.0.0.1:8000/api/${props.endpoint}`,{
//                 name:name,
//                 email:email,
//                 password:password,
//                 password_confirmation:passwordR,
//             })
//             const token = res.data.data.token;
//             const userDetails = res.data.data.user;
//             userNow.setAuth({token,userDetails});
//             nav("/dashboard")
//         }
//         }catch(err){
//             setFetchError(err.response.status)
//         }
//     }
//     const formsteyl = {textAlign:'left',height: 'auto'};
//     const labelstyle = {color:"#261633",border:'none',width:'70%', fontSize:'1.2em',fontWeight: '500'};
//     const inputstyle = {color:'#545454',border:'solid 1px #545454',borderRadius:'5px',padding:'10px',fontSize:'15px'};
//     const buttonstyle = {color:'#fff', backgroundColor:'#261633',padding:'10px',fontSize:'20px'}
    
    
//     return(
//         <div>
//             <div className="my-form" style={props.updatestyle && formsteyl}>
//                 <form onSubmit={submit} style={props.updatestyle && labelstyle}>
//                     <label htmlFor="name">Name</label>
//                     <input
//                         style={props.updatestyle && inputstyle}
//                         id="name"
//                         type="text"
//                         value={name}
//                         onChange={(e)=> setName(e.target.value)} />
//                         {/* {accept && name.length<1 && <p className="error">Name is required</p>} */}
//                     <label htmlFor="email">Email</label>
//                     <input
//                         style={props.updatestyle && inputstyle}
//                         id="email"
//                         type="email"
//                         value={email}
//                         onChange={(e)=> setEmail(e.target.value)}/>
//                     {accept && fetchError===422 && (<p className="error">The email is alraedy beeen taken</p>)}
//                     <label htmlFor="password">Password</label>
//                     <input
//                         style={props.updatestyle && inputstyle}
//                         id="password"
//                         type="password"
//                         value={password}
//                         onChange={(e)=> setPassword(e.target.value)}/>
//                         {/* {accept && password.length<4 && <p className="error">the password should be longer</p>} */}
//                     <label htmlFor="passwordR">Repeat Password</label>
//                     <input
//                         style={props.updatestyle && inputstyle}
//                         id="passwordR"
//                         type="password"
//                         value={passwordR}
//                         onChange={(e)=> setPasswordR(e.target.value)}/>
//                         {/* {accept && password!== passwordR && <p className="error">password dosn't match</p>} */}
//                     <button style={props.updatestyle && buttonstyle} type="submit">{props.button}</button>
//                 </form>
//             </div>
//         </div>
//     )
// }