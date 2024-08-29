import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Users(){
    const [users,setUsers] = useState([]);
    const [runEF,setRunEF] = useState(0);
    // const token = user.auth.token;
    const cookie = new Cookies();
    const getToken = cookie.get("Bearer")
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/user/show",{
                headers:{
                    Accept: "application/json",
                    Authorization: "Bearer " + getToken,
                },
            })
            .then((data) => setUsers(data.data))
            .catch((err) => console.log(err))
    },[runEF])
    async function deletUser(id){
        try{
            const res = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`,{
                headers:{
                    Authorization: "Bearer " + getToken,
                },
            });
            if(res.status === 200){
                setRunEF(prev => prev+1)
            }
        }catch{console.log('error')}

    }
    const showUsers = users.map((user,index) => (
        <tr key={index}>
            <td>{index + 1 }</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <Link to={`${user.id}`}>
                    <i className="fa-solid fa-pen-to-square"
                        style={{color:"#261633",fontSize:'1.3em',marginRight:'10px',cursor:'pointer'}}></i>
                </Link>
                <i className="fa-solid fa-trash"
                    onClick={()=>deletUser(user.id)}
                    style={{color:"#d30202",fontSize:'1.3em',marginRight:'10px',cursor:'pointer',}}></i>
            </td>
        </tr>
    ))

    
    return(
        <div style={{width:"100%"}}>
            <div style={{padding:'10px'}}>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showUsers}
                    </tbody>
                </table>
                <button>Refresh Token</button>
            </div>
        </div>
    )
}


