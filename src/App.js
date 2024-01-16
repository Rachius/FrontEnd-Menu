
import { AuthProvider } from './contexts/AuthContex';
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






function App() {

// const {data} = useFetch("https://jsonplaceholder.typicode.com/users")

  return (
      
    <div className="">
    <AuthProvider>
          <Router>

          <NavBar/>

          <Routes>
           
            <Route path="/registro" element={<Registro/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/logOut" element={<logOut/>}/>
          <Route element={<ProtectedRoute/>}>            
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/platos" element={<Platos/>}/>
            <Route path="/bebidas" element={<Bebidas/>}/>
            <Route path="/postres" element={<Postres/>}/>
            <Route path="/logOut" element={<logOut/>}/>
          </Route>
        
          </Routes>
          </Router>


      </AuthProvider>

      

    </div>
  );
}

export default App;
