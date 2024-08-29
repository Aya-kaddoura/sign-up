import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Context/UserContext";
import Loading from "../../../components/Loading";
import Cookies from "universal-cookie";

export default function PersistLogin(){
    const user = useContext(User);
    // const token = user.auth.token;
    const [loading ,setLoading] = useState(true);
    //Cookie
    const cookie = new Cookies();
    const getToken = cookie.get("Bearer")
    useEffect(()=>{
        async function refresh(){
            try{
                await axios.post(`http://127.0.0.1:8000/api/refresh`,null,{
                    headers:{
                        Authorization : 'Bearer ' + getToken
                    }
                })
                .then((data)=> user.setAuth(prev=>{
                    cookie.set("Bearer",data.data.token)
                    return {...prev, token:data.data.token}
                }))
            }
            catch(err) {
                console.log(err)
            }
            finally{
                setLoading(false)
            }
        }
        !user.auth ? refresh() : setLoading(false)
        },[])
    return loading ?  <Loading/> : <Outlet/>  
}