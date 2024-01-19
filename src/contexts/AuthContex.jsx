import { createContext,useState, useContext,useEffect } from "react";
import { registerRequest,loginRequest,verifyTokenRequest,logOutRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext()

export const useAuth = () =>{
    const context = useContext(AuthContext)
    if (!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}


export const AuthProvider = ({children}) => {
    const [user,setUser] =  useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading,setLoading] = useState(true)


    const signup = async (user)=>{

        try {
            const res = await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticated(true)
            
        } catch (error) {
            console.log(error.response)
           setErrors(error.response.data)

        }

    }
        
    const signin = async(user)=>{
        try {
            const res=  await loginRequest(user)
            console.log(res.data)
            setIsAuthenticated(true)
            setUser(res.data)
            console.log(res.data)
            
    } catch (error) {
        console.log(error.response.data)
         if(Array.isArray(error.response.data)){
           return setErrors(error.response.data)
        } 
      setErrors([error.response.data.message]) }
    }  



    const logOut = async (user)=>{
       try {    
            const res=  await logOutRequest(user)
            Cookies.remove("token")
            setIsAuthenticated(false)
            setUser(null)
           console.log(res.data.message)
            
} catch (error) {
    console.log(error.response)
    setErrors(error.response.data)
}

    }

        useEffect(()=> {
        if(errors.length>0) {
           const timer = setTimeout(()=>{
                setErrors([])
            },500)
            return ()=>clearTimeout(timer)
        }
    })

 /*   useEffect(() => {
        const checkAuthentication = async () => {
          const token = Cookies.get('token');
      
          if (token) {
            try {
              const res = await verifyTokenRequest(token); // Tu función para verificar el token
              if (res.data) {
                setIsAuthenticated(true);
                setUser(res.data);
              } else {
                setIsAuthenticated(false);
                setUser(null);
              }
            } catch (error) {
              setIsAuthenticated(false);
              setUser(null);
            }
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
      
          setLoading(false);
        };
      
        checkAuthentication();
      }, []);
      
*/

    useEffect(()=>{
        async function checklogin(){
            const cookies = Cookies.get()
            
            
                   if(!cookies.token){
                       setIsAuthenticated(false)
                         setLoading(false)
                            return setUser(null)
                                             }
          try {
                const res = await verifyTokenRequest(cookies.token)
              
                    if(!res.data){
                        setIsAuthenticated(false)
                        setLoading(false)
                        return
                }

                setIsAuthenticated(true)
                setUser(res.data)
               
                setLoading(false)
               } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
               }
            }
            checklogin()
        },[])


    return (<AuthContext.Provider value={{signin,signup,logOut,user,isAuthenticated,errors,loading,}}>
        {children}
    </AuthContext.Provider>)

}