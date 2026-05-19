//This manages all the global contexts and the functions that we made

import { useContext, useEffect } from "react";
import { AuthContext } from "../Auth.context.jsx";
import {login, register, logout, get_me} from "../services/auth.api.js"

export const useAuth = ()=>{
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context

    const handleLogin = async ({email, password}) =>{
        setLoading(true)

        try{
            const data = await login({email, password})
            await setUser(data.user)
            console.log(data.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleRegister = async ({username, email, password}) =>{
        setLoading(true)
        try{
            const data = await register({username, email, password})
    
            setUser(data.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = async ()=>{
        setLoading(true)
        try{
            const data = await logout()
            setUser(null)

        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }

    }

    // to prevent rerender the user variable
    useEffect(()=>{
        const getAndSetUser = async()=>{
            try{
                const data = await get_me()
                setUser(data.user)
                setLoading(false)
            }catch(err){
                console.lof(err)
            }finally{
                setLoading(false)
            }
        }

        getAndSetUser()
    },[])

    return {user, loading, handleRegister, handleLogin, handleLogout }
}