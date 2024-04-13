import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: {blog: Blog}) => {
    return <div>
        <Appbar />
        <div className="flex justify-center ">
            <div className="grid grid-cols-12 px-20 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd December 2023
                    </div>
                    <div className="pt-4 text-xl">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 ">
                    <div className="text-slate-600 text-lg rounded-lg ">
                        Author :-
                    </div>
                    <div className="flex w-full">
                        <div className="p-4 flex flex-col justify-center ">
                            <Avatar size="big" name={blog.author.name.toUpperCase() || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl text-slate-600 font-bold">
                                {blog.author.name.toUpperCase() || "Anonymous"}
                            </div>
                            <div className="text-slate-500">
                            Artistic soul, loves painting and sketching, enjoys gardening, food blogger, and passionate about social justice issues.
                             </div>
                        </div>
                    </div>  
                </div>
                
            </div>
        </div>
    </div>
}

