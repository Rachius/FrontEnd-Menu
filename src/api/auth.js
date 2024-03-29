import axios from "./axios"



export const registerRequest = user => axios.post(`/register`,user)

export const loginRequest = user => axios.post(`/login`,user)

export const verifyTokenRequest = () => axios.get(`/verify`)

export const logOutRequest = user => axios.post(`/logOut`,user)

export const crearMenuRequest = menu => axios.post(`/admMenu/crearMenu`, menu);

export const listarMenuRequest = () => axios.get(`/admMenu/listarMenu`);

export const listarPedidoRequest = () => axios.get(`/admPedidos/listarPedido`);

export const listarUsuariosRequest = () => axios.get(`/admUser/listarUsuarios`);

export const admCrearUsuarioRequest = admUserCreate => axios.post(`/admUser/admRegister`,admUserCreate);

export const modificarUsuarioRequest = (useredit,editingUserId) => axios.put(`/admUser/${editingUserId}`,useredit); 

export const modificarMenuRequest = (menuEdit,editingUserId) => axios.put(`/admMenu/${editingUserId}`,menuEdit); 

export const modificarPedidoRequest = (pedido,pedidoEditID) => axios.put(`/admPedidos/${pedidoEditID}`,pedido);


export const crearPedidoRequest = pedido => axios.post(`/admPedidos/pedido`, pedido);
