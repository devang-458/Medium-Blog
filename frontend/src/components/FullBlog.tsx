import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 md:px-20 w-full pt-12 max-w-screen-xl">
                    <div className="md:col-span-8">
                        <div className="text-3xl md:text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Post on 2nd December 2023
                        </div>
                        <div className="pt-4 text-base md:text-xl">
                            {blog.content}
                        </div>
                    </div>
                    <div className="md:col-span-4">
                        <div className="text-slate-600 text-lg rounded-lg">
                            Author:-
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center w-full">
                            <div className="p-6 justify-center hidden md:visible ">
                                <Avatar size="big" name={blog.author.name.toUpperCase() || "Anonymous"} />
                            </div>
                            <div className="md:pl-4">
                                <div className="text-xl text-slate-600 font-bold ">
                                    {blog.author.name.toUpperCase() || "Anonymous"}
                                </div>
                                <div className="text-slate-500 pb-10 bottom">
                                    Artistic soul, loves painting and sketching, enjoys gardening, food blogger, and passionate about social justice issues.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
