

import { AuthProvider,useAuth} from './contexts/AuthContex';

import './App.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import NavBar from './components/NavBar';
import CartaMenu from './screens/Home';
import Registro from './screens/Registro';
import Login from './screens/Login';
import Pedidos from './screens/Pedidos';
import LogOut from './screens/LogOut';
import ProtectedRoute from './ProtectedRoutes';
import { AdminRoute } from './ProtectedRoutes';
import EditPedido from './screens/EditPedido.jsx';
import EditUsuario from './screens/EditUsuario.jsx';
import EditMenu from './screens/editMenu.jsx';



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
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<CartaMenu/>}/>
            </Route>

            <Route>
            <Route element={<AdminRoute/>}>
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/home" element={<CartaMenu/>}/>
            <Route path="/logOut" element={<LogOut/>}/>
            <Route path="/editMenu" element={<EditMenu/>}/>
            <Route path="/editUsuario" element={<EditUsuario/>}/>
            <Route path="/editPedido" element={<EditPedido/>}/>
            </Route>

            </Route>
            <Route element={<ProtectedRoute/>}>            
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/home" element={<CartaMenu/>}/>
            <Route path="/logOut" element={<LogOut/>}/>
          </Route>
        
          </Routes>
          </Router>

      </AuthProvider>

      

    </div>
  );
}

export default App;
