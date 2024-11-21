import { createContext, useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
export const AuthContext = createContext();



 export const AuthProvider = ({children}) => {

  const [token,setToken] = useState(localStorage.getItem("token"))

  const [user, setUser] = useState()
  const AuthorizationToken = `Bearer ${token}`
  
  // to set token in local storage
  const storetokenInLocalStorage = (token)=>{
       setToken(token)
   return localStorage.setItem("token", token)
  }
  
 // to get current user detail using jwt token
  const userAuthentication = async ()=>{
    try {
       const response = await fetch("http://localhost:8000/api/v1/currentuser", {
           method: 'GET',
           headers:{
               Authorization: AuthorizationToken,
           }
       });

       if(response.ok) {
           const data = await response.json()
           console.log("userdata", data.user.pinned)
           setUser(data.user.name)
       }
       else{
           console.log("error while fetching user data")
       }
       
    } catch (error) {
       console.error("error fetching user data") 
    }
 }
 

 useEffect(()=>{
  if(token){
    userAuthentication()
  } else{
    setUser(null)
  }
 },[token])





  return <AuthContext.Provider value={{storetokenInLocalStorage, user, token, AuthorizationToken}} >
          {children}
  </AuthContext.Provider>

  }

  // custom hook
 // export const useAuth = () => { return useContext(AuthProvider) }

 export const useAuth = () => {
  const authContextValue = useContext(AuthContext) 
   if(!authContextValue ) {
    throw new Error("useauth used outside of the provider");
   }

  return authContextValue
 }