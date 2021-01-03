import {get, post} from 'axios'

export const getData= async(token)=>{
    const users = await get('/api/users',{
        headers: {
          Authorization: 'Bearer ' + token 
        }})
    return users
}

export const login=async(body)=>{
     const response= post('/api/login',body)
     return response
}

export const submit=async(body)=>{
    const response=await post('/api/users/submit',body)
    return response
}

export const logout=async(token)=>{
    const response =await get('/api/logout',{
        headers: {
          Authorization: 'Bearer ' + token
        }})
    return response
}

