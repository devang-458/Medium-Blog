import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog {
    "content" : string,
    "title" : string,
    "id": number,
    "author" : {
        "name" : string
    }
}


export const useBlog = ({id}: {id:string}) => {
    const [blog, setBlog] = useState<Blog>()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setLoading(false),
            setBlog(response.data.blog)
        })
    },[id])

    return {
        loading,
        blog
    }
}



export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect (() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            const sortedBlogs = response.data.blogs.slice().sort((a: Blog ,b: Blog ) => b.id - a.id)
            setBlogs(sortedBlogs),
            setLoading(false)
        })
    }, [])

    return {
        loading,
        blogs
    }
}
