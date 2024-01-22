import axios from "./axios"



export const registerRequest = user => axios.post(`/register`,user)

export const loginRequest = user => axios.post(`/login`,user)

export const verifyTokenRequest = () => axios.get(`/verify`)

export const logOutRequest = user => axios.post(`/logOut`,user)

export const crearMenuRequest = menu => axios.post(`/admMenu/crearMenu`, menu);

export const listarMenuRequest = menu => axios.get(`/admMenu/listarMenu`);


export const listarCarritoRequest = menu => axios.get(`/admMenu/listarCarrito`);

export const listarUsuariosRequest = user => axios.get(`/admUser/listarUsuarios`);

export const admCrearUsuarioRequest = admUserCreate => axios.post(`/admUser/admRegister`,admUserCreate);

export const modificarUsuarioRequest = useredit => axios.put(`/admUser/${useredit._id}`,useredit); 

