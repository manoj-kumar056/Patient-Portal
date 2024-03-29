import React, { useContext, useState } from 'react'

const AuthContext = React.createContext(null)

export default function Auth({children}){
    const [user,setUser] = useState()

    const login = (user)=>{
        setUser(user)
    }

    const logout = ()=>{
        setUser(null)
    }

  return (
    <div>
      <AuthContext.Provider value={{user,login,logout}}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export const useAuth = ()=>{
    return useContext(AuthContext)
}
