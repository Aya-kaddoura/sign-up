import { Link } from "react-router-dom";

export default function TopBar(){
    return(
        <div className="top-bar">
            <div style={{fontSize:"30px",color:"#261633",fontWeight:'bold'}}>Store</div>
            <Link to="/" className="register">Go To Web Site</Link>
        </div>
    )
}