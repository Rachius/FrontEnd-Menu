

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
import EditPedido from './screens/EditPedido.jsx';
import EditUsuario from './screens/EditUsuario.jsx';
import EditMenu from './screens/editMenu.jsx';
import CartaMenu from './screens/Menus.jsx';


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
            <Route path="/Home" element={<Home/>}/>
            <Route path="/carta" element={<CartaMenu/>}/>
            </Route>
            <Route>
            <Route element={<AdminRoute/>}>
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/carta" element={<CartaMenu/>}/>
            <Route path="/logOut" element={<LogOut/>}/>
            <Route path="/editMenu" element={<EditMenu/>}/>
            <Route path="/editUsuario" element={<EditUsuario/>}/>
            <Route path="/editPedido" element={<EditPedido/>}/>
            </Route>

            </Route>
            <Route element={<ProtectedRoute/>}>            
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/carta" element={<CartaMenu/>}/>
            <Route path="/logOut" element={<LogOut/>}/>
          </Route>
        
          </Routes>
          </Router>


      </AuthProvider>

      

    </div>
  );
}

export default App;
