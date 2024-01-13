import React, { Component } from 'react';
import { Form } from 'react-router-dom';
import axios from 'axios';





class Login extends Component{
  state={
       form:{
             username: '',
             password: '',
 
           }
           
         }
 
         handleChange = e=>{
           this.setState({
             form:{
               ...this.state.form,
               [e.target.name]: e.target.value
             }
           });
           console.log(this.state.form);
 
         }
 
         render (){
           return (
             <div>Loginasd
                 <div class="d-flex justify-content-center">
             <div >
               <br />
               <br />
                 <h3>Inicia sesión</h3>
                 <br />
                 <form>
                 <div class="mb-3">
                  <label for="InputEmailReg" class="form-label">Usuario</label>
                  <input type="email" class="form-control" id="InputEmailReg" aria-describedby="emailregHelp" placeholder="usuario@correo.com" required onChange={this.handleChange} name="username"/>
                 </div>
                 <div class="mb-3">
                  <label for="InputPasswordReg" class="form-label">Contraseña</label>
                     <input type="password" class="form-control" id="InputPasswordReg" required onChange={this.handleChange} name="password"/>
                         
                 </div>
                 <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                  <label class="form-check-label" for="exampleCheck1">Check me out</label>
                 </div>
                 <div>         
                 <button type="submit" class="btn btn-success">Submit</button>
                 
                 </div>
 
 
             
             
                 </form>
               </div>
       </div>
     </div>
  )
  }
  }

  export default Login