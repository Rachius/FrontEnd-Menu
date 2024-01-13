import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './screens/Home';
import Registro from './screens/Registro';
import Login from './screens/Login';
import Pedidos from './screens/Pedidos';
import Navbar from './components/NavBar';
import Platos from './screens/Platos';
import Bebidas from './screens/Bebidas';
import Postres from './screens/Postres';
import código from './components/codigo';







function App() {

// const {data} = useFetch("https://jsonplaceholder.typicode.com/users")

  return (
      
    <div className="">
          
      <Router>

        <NavBar/>
        
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/pedidos" element={<Pedidos/>}/>
          <Route path="/platos" element={<Platos/>}/>
          <Route path="/bebidas" element={<Bebidas/>}/>
          <Route path="/postres" element={<Postres/>}/>
        </Routes>
        </Router>
      
      {/* <div className='card'>
        <ul>
          {data?.map ((user) => (
            <li key={user.id}>{user.name} </li>
          ))}
        </ul>
        
      </div> */}
      

    </div>
  );
}

export default App;
