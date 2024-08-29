import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Products(){
    const [products,setProducts] = useState([]);
    const [runEF,setRunEF] = useState(0);
    const cookie = new Cookies();
    const getToken = cookie.get("Bearer");
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/product/show",{
                headers:{
                    Accept: "application/json",
                    Authorization: "Bearer " + getToken,
                },
            })
            .then((data) => {
                setProducts(data.data);
            })
            .catch((err) => console.log(err))
    },[runEF])
    async function deletProduct(id){
        try{
            const res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`,{
                headers:{
                    Authorization: "Bearer " + getToken,
                },
            });
            if(res.status === 200){
                setRunEF(prev => prev+1)
            }
        }catch{console.log('error')}

    }
    const showProducts = products.map((product,index) => (
        <tr key={index}>
            <td>{index + 1 }</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td><img src={`${product.image}`} alt="img" width={100}/></td>
            <td>
                <Link to={`${product.id}`}>
                    <i className="fa-solid fa-pen-to-square"
                        style={{color:"#261633",fontSize:'1.3em',marginRight:'10px',cursor:'pointer'}}></i>
                </Link>
                <i className="fa-solid fa-trash"
                    onClick={()=>deletProduct(product.id)}
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
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showProducts}
                    </tbody>
                </table>
            </div>
        </div>
    )
}