

import { UseForm } from 'react-hook-form';
import { Button } from 'bootstrap';
import React, { useState, useEffect } from "react";
import axios from "axios";



const EditMenu = () => {

  return (
    
    <div className='d-flex justify-content-between conteiner-fluid'>Home
      <br />
      <br />
      
      <div className='justify-content-left col-5'>   
                          
                                  <h4>Lista de Menus</h4>
                                  <br />                                
                                  <form>        
                                  <table class="table">
                            <thead>
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Menú</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Estado</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">1</th>
                                <td>Menú1</td>
                                <td>Plato1</td>
                                <td>Precio1</td>
                                <td><div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" /></div></td>
                              </tr>
                              <tr>
                                <th scope="row">2</th>
                                <td>Menú1</td>
                                <td>Plato1</td>
                                <td>Precio1</td>
                                <td><div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" /></div></td>
                              </tr>

                            </tbody>
                   </table>
                </form>
                                 
          </div>
        
      <div className='d-flex  col-4 flex-wrap'>
            <form>
             <h4>Editar Menu</h4>

              <div class="mb-3">
                <label  class="form-label">Ingrese el ID del menú a editar</label>
                <input type="email" class="form-control" id="exampleInputEmail1" />
                <div  class="form-text">Aqui puede ir algo</div>
              </div>
              
                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Nombre del menu</label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>

                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Descripción</label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>

                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Categoria</label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>


                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Precio</label>
                <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" class="btn btn-success mb-3">Crear</button>
                <button type="submit" class="btn btn-warning mb-3">Editar</button>
                <button type="submit" class="btn btn-danger mb-3">Eliminar</button>
                </form>

          </div>
          </div>
      
  
  )
};

export default EditMenu