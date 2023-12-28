import axios from "axios"
import { axiosJWT } from "./UserService"



export const getAllPosts = async ( limit)=>{
    let res = {}   
        res = await axios.get(`${process.env.REACT_APP_API_URL}/posts/get-all?limit=${limit}`)
    return res.data
}


export const createPosts = async (data)=>{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/posts/create`, data)
    return res.data
}

export const getDetailsPosts = async (id)=>{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts/get-details/${id}`)
    return res.data
}




export const deletePosts = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/posts/delete/${id}`,  {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const deleteManyPosts = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/posts/delete-many`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const updatePost = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/posts/update/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

