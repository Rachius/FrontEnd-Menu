import { useAuth } from "./contexts/AuthContex"
import { Navigate, Outlet } from "react-router-dom"


function ProtectedRoute() {
    const {loading,isAuthenticated}= useAuth()
    if(loading) return <h1>Loading...</h1>
    if(!loading && !isAuthenticated) return <Navigate to='/login' replace/>

    return <Outlet/>
}

export  function AdminRoute(){
    const [user,isAuthenticated] = useAuth()
    const isAdmin = isAuthenticated && user && user.rol === 'admin';
    if (!isAdmin) return <Navigate to="/Home" replace />;

   return <Outlet/>
}
export default ProtectedRoute

