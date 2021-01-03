import {get, post} from 'axios'

export const getData= async(token)=>{
    const users = await get('/users',{
        headers: {
          Authorization: 'Bearer ' + token 
        }})
    return users
}

export const login=async(body)=>{
     const response= post('/login',body)
     return response
}

export const submit=async(body)=>{
    const response=await post('/users/submit',body)
    return response
}

export const logout=async(token)=>{
    const response =await get('/logout',{
        headers: {
          Authorization: 'Bearer ' + token
        }})
    return response
}

