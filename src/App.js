

import { AuthProvider,useAuth} from './contexts/AuthContex';

import './App.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './screens/Home';
import Registro from './screens/Registro';
import Login from './screens/Login';
import Pedidos from './screens/Pedidos';
import Platos from './screens/Platos';
import Bebidas from './screens/Bebidas';
import Postres from './screens/Postres';
import LogOut from './screens/LogOut';
import ProtectedRoute from './ProtectedRoutes';
import { AdminRoute } from './ProtectedRoutes';
import { Unlogin } from './ProtectedRoutes';
import EditarPedido from './screens/editarpedido';





function App() {

// const {data} = useFetch("https://jsonplaceholder.typicode.com/users")

  return (
      
    <div className="">
    <AuthProvider>
          <Router>

          <NavBar/>

          <Routes>
            <Route >
            <Route path="/registro" element={<Registro/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/platos" element={<Platos/>}/>
            <Route path="/bebidas" element={<Bebidas/>}/>
            <Route path="/postres" element={<Postres/>}/>
            </Route>
            <Route>
            <Route element={<AdminRoute/>}>
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/platos" element={<Platos/>}/>
            <Route path="/bebidas" element={<Bebidas/>}/>
            <Route path="/postres" element={<Postres/>}/>
            <Route path="/logOut" element={<LogOut/>}/>
            <Route path="/editUsuarios" element={<LogOut/>}/>
            <Route path="/editMenu" element={<LogOut/>}/>
            </Route>

            </Route>
            <Route element={<ProtectedRoute/>}>            
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/platos" element={<Platos/>}/>
            <Route path="/bebidas" element={<Bebidas/>}/>
            <Route path="/postres" element={<Postres/>}/>
            <Route path="/logOut" element={<LogOut/>}/>
          </Route>
        
          </Routes>
          </Router>


      </AuthProvider>

      

    </div>
  );
}

export default App;
