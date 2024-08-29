import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function UpdateProduct(){
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [image,setImage] = useState("");
    const [accept,setAccept] = useState(false);
    const cookie = new Cookies();
    const token = cookie.get("Bearer");
    const nav = useNavigate();
    const formData = new FormData();
    let id = window.location.pathname.split("/").slice(-1)[0];
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}`,{
            headers:{
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        })
        .then((data)=>{
            setTitle(data.data[0].title);
            setDescription(data.data[0].description);
        })
    },[])
    async function submit(e) {
        e.preventDefault();
        setAccept(true);
        try{
            formData.append("title",title);
            formData.append("description",description);
            formData.append("image",image);

            await axios.post(`http://127.0.0.1:8000/api/product/update/${id}`,
                    formData,
                {
                    headers:{
                        Authorization: "Bearer " + token
                    }
                }
            );
            nav("/dashboard/products")
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div>
            <form onSubmit={submit} className="create-Product">
                <label htmlFor="title">Title</label>
                <input 
                    id="title" 
                    type="text" 
                    placeholder="Title..." 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} />
                {title.length < 2 && accept && (<p className="error">Title must be more than 2 char</p>)}

                <label htmlFor="description">Description</label>
                <input 
                    id="description" 
                    type="text" 
                    placeholder="Description..." 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} />

                <label htmlFor="img">Image</label>
                <input 
                    id="img" 
                    type="file" 
                    placeholder="Image..." 
                    value={formData.image} 
                    onChange={(e) => setImage(e.target.files.item(0))} />

                <div>
                    <button type="submit">Update User</button>
                </div>
            </form>
        </div>
    )
}