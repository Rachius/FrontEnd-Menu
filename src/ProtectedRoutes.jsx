import { useAuth } from "./contexts/AuthContex"
import { Navigate, Outlet } from "react-router-dom"


function ProtectedRoute() {
    const {loading,user,isAuthenticated } = useAuth()
    if(loading) return <h1>Loading...</h1>
    const isUser =isAuthenticated && user && user.rol === 'user';
    console.log(user.rol)
    if (!loading && !isUser) return <Navigate to="/Home" replace />;

   return <Outlet/>
}
/*
export function Unlogin() {
    const {loading,isAuthenticated}= useAuth()
   
    if(loading && !isAuthenticated) return <h1>Loading...</h1>

    return <Outlet/>
}*/

export  function AdminRoute(){

    const {loading,user,isAuthenticated } = useAuth()
    if(loading) return <h1>Loading...</h1>
    const isAdmin =isAuthenticated && user && user.rol === 'admin';
    if (!loading && !isAdmin) return <Navigate to="/Home" replace />;

   return <Outlet/>
}


export default ProtectedRoute

