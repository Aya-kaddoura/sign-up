import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
export default function DashBoard(){
    return(
        <div className="db">
            <TopBar/>
            <div style={{display:'flex',height:'100%'}}>
                <SideBar/>
                <div style={{width:'80%',}}><Outlet/></div>
            </div>
        </div>
    )
}