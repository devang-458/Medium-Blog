import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog"
import { Appbar } from "../components/Appbar"
import { Circle } from "../components/BlogCard"

export const Blog = () => {
    const { id } = useParams()
    const { loading, blog } = useBlog({
        id: id || ""
    })
    if (loading || !blog) {
        return <div>
            <div>
                <Appbar />
                <div role="status" className="flex justify-center animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 md:px-20 w-full pt-12 max-w-screen-xl">
                        <div className="md:col-span-8">
                            <div className="text-3xl md:text-5xl font-extrabold">
                                <div className="h-8 bg-gray-200 rounded-full mb-2.5"></div>
                                <div className="h-8 w-62 bg-gray-200 rounded-full mb-2.5"></div>
                                <div className="h-6 w-56 bg-gray-200 rounded-full mb-2.5"></div>
                                <div className="h-4 bg-gray-200 rounded-full mb-2.5"></div>
                            </div>
                            <div className="text-slate-500 pt-2">
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            </div>
                            <div className="pt-4 text-base md:text-xl">
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            </div>
                        </div>
                        <div className="md:col-span-4">
                            <div className="text-slate-600 text-lg rounded-lg">
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                                <div className="h-2 w-40 bg-gray-200 rounded-full mb-2.5"></div>
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:items-center w-full">
                                <div className="p-6 justify-center hidden md:visible ">
                                    <Circle />
                                </div>
                                <div className="md:pl-4">
                                    <div className="text-xl text-slate-600 font-bold ">
                                        <div className="h-2 w-56 bg-gray-200 rounded-full mb-2.5"></div>
                                        <div className="h-2 w-40 bg-gray-200 rounded-full mb-2.5"></div>
                                    </div>
                                    <div className="text-slate-500 pb-10 bottom">
                                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}