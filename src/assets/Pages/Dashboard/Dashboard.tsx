import { Outlet } from "react-router-dom"
import SideBar from "../../../components/SideBar/SideBar"
import './Dashboard.css'


export default function Dashboard() {
    return (
        <>
            <SideBar />
            <section className="FM-dash-header">
                <Outlet />
            </section>
        </>
    )
}
