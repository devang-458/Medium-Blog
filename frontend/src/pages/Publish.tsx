import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const navigate = useNavigate()
    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg  w-full px-10 py-4">
                <textarea onChange={(e) => {
                    setTitle(e.target.value)
                }} className="block p-4 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 my-4" placeholder="Title"></textarea>
                <textarea onChange={(e) => {
                    setContent(e.target.value)
                }} className="block h-72 p-4 text-lg w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Content"></textarea>
                <div className="flex flex-row justify-center py-4">
                    <button onClick={async () => {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                            title,
                            content
                        },{
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        })
                        navigate(`/blog/${response.data.id}`)
                    }} className="mr-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                        Publish +
                    </button>
                </div>
            </div>

        </div>
    </div>
}