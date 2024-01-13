import React from 'react'
import { Form } from 'react-router-dom'


const Registro = () => {
  return (
      <div class="d-flex justify-content-center">
        <div >
          <br />
          <br />
            <h3>Formulario de registración</h3>
            <br />
            <form>
              <div class="mb-3 needs-validation" novalidate>
              <label for="InputNameReg" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="InputNameReg" aria-describedby="nameregHelp" required />
            </div>
            <div class="mb-3">
              <label for="InputEmailReg" class="form-label">Usuario</label>
              <input type="email" class="form-control" id="InputEmailReg" aria-describedby="emailregHelp" placeholder="usuario@correo.com" required />
            </div>
            <div class="mb-3">
              <label for="InputPasswordReg" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="InputPasswordReg" required/>
              <span id="passwordHelpInline" class="form-text">Debe tener entre 8-20 characteres de largo.</span>
                    
            </div>
            {/* <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div> */}
            <div>         
            <button type="submit" class="btn btn-success">Submit</button>
            
            </div>


            
            
          </form>
          
          </div>
      </div>
  )
}

export default Registro