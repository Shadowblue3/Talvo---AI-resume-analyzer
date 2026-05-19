// In here we will interact with the backend api's that we built
import axios from "axios"

//This is an axios instance and now can be used for any functions, without repeting the same lines of code
const api = axios.create({
    baseURL: "https://talvo-ai-resume-analyzer.onrender.com",
    withCredentials: true
})

export async function register({username, email, password}){

    try{

        const response = await api.post('/api/auth/register', {
        username, email, password
    })
    return response.data

    }catch(err){
        console.log("Error connecting to Backend")
        console.log(err)
    }
}

export async function login({email, password}){

    try{
        const response = await api.post("/api/auth/login",{email, password})

        return response.data
    }catch(err){
        console.log(err)
    }
}

export async function logout(){
    try{
        const response = await api.get("/api/auth/logout")

        return response.data
    }catch(err){
        console.log(err)
    }
}

export async function get_me(){
    try{
        const response = await api.get("/api/auth/get-me")

        return response.data
    }catch(err){
        console.log(err)
    }
}

