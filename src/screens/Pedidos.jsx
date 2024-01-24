import React from 'react'
import { useAuth } from '../contexts/AuthContex'

const Pedidos = () => {

  const {user} = useAuth()
  console.log(user)
  return (

  
  <div class="d-flex col-12 row">
    <div class="conteiner-fluid row">
          <div class="card col-lg-8 mx-auto mt-5 shadow-lg rounded-2" >
            <div class="card-header text-center">
                <p>Orden de pedido</p>

            </div>
            <div className="card-body" >
             <table class="table table-warning" >
                <thead>
                  <tr>
                    <th>#</th>
                    <th class="text-start">Menú</th>
                    <th class="text-start">Precio</th>
                    
                    

                  </tr>
                </thead>
                    <tbody class="table-light">
                        <tr>
                        <td>
                            <p>N</p>
                          </td>
                          <td>
                            <p>Menú</p>
                          </td>
                          <td>
                            <p>Precio</p>
                          </td>
                          
                        </tr>
                        <tr>
                            <td colspan="4" class="text-center">Total del carrito</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div class="card col-sm-12 col-md-6 col-lg-6 col-xl-6 align-items-center justify-content-around mx-auto mt-1 mb-5">
                    <h5 class="card-title mt-2">Total a Pagar:$$</h5>
                        <a href="../pages/carritof.html" class="btn btn-outline-success mb-3  col-md-6 ">Seguir ordenando</a>
                        <a href="../pages/carritof.html" class="btn btn-outline-success mb-3  col-md-6">Finalizar pedido​</a>
                </div>
            </div>
          </div>
        </div>
        
  </div>
  )
}

export default Pedidos