

import { AuthProvider} from './contexts/AuthContex';

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
import EditMenu from './screens/EditarMenu.jsx';
import LogoutScr from './screens/LogoutScr.jsx';
import EsperandoPedido from './screens/esperaPedido.jsx';



function App() {


  return (
      
    <div className="">
    <AuthProvider>
          <Router>

          <NavBar/>
          <Routes>
            <Route >
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/registro" element={<Registro/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<CartaMenu/>}/>
            <Route path="/" element={<CartaMenu/>}/>
            <Route path="/logoutscr" element={<LogoutScr/>}/>
            <Route path="/esperaPedido" element={<EsperandoPedido/>} />
            </Route>

            <Route>
            <Route element={<AdminRoute/>}>
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/home" element={<CartaMenu/>}/>
            <Route path="/logout" element={<LogOut/>}/>
            <Route path="/editMenu" element={<EditMenu/>}/>
            <Route path="/editUsuario" element={<EditUsuario/>}/>
            <Route path="/editPedido" element={<EditPedido/>}/>
            <Route path="/" element={<CartaMenu/>}/>
            <Route path="/logout" element={<LogOut/>}/>
            <Route path="/logoutscr" element={<LogoutScr/>}/>
            </Route>

            </Route>
            <Route element={<ProtectedRoute/>}>            
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/home" element={<CartaMenu/>}/>
            <Route path="/logout" element={<LogOut/>}/>
            <Route path="/" element={<CartaMenu/>}/>
            <Route path="/logoutscr" element={<LogoutScr/>}/>
            <Route path="/esperaPedido" element={<EsperandoPedido/>} />
            </Route>
        
          </Routes>
      </Router>

      </AuthProvider>

      

    </div>
  );
}

export default App;
