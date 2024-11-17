import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
 const [token, setToken] = useState(localStorage.getItem("token"));
 // for setup current user 
 const [user, setUser] = useState("");
 const AuthorizationToken = `Bearer ${token}`

 // to store token in local storage

  const storeTokenInLS = (servertoken)=>{
      setToken(servertoken);
    return localStorage.setIteam('token', servertoken)
  }



  // for logout the user
  let LogoutUser = ()=> {

    setToken("");
    return localStorage.deleteIteam("token")
  }

// jwt to get current loggedin user data

  const userAuthentication = async ()=>{
     try {
        const response = await fetch("http://localhost:8000/api/v1/user", {
            method: 'GET',
            headers:{
                Authorization: AuthorizationToken,
            }
        });

        if(response.ok) {
            const data = await response.json()
            console.log("userdata", data)
            setUser(data.name)
        }
        else{
            console.log("error while fetching user data")
        }
        
     } catch (error) {
        console.error("error fetching user data") 
     }
  }

  useEffect(()=>{
    userAuthentication()
  },[])






  return (
    <AuthProvider.Provider value = {{
        LogoutUser, user, AuthorizationToken
    }} >
      {children}
    </AuthProvider.Provider>
  )
}

export const useAuth = () => {
   const authContextValue = useContext(AuthContext);
   if(!authContextValue){
     throw new Error ("useauth used ouside of the provider");
   }
   return authContextValue
}