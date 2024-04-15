import { Link } from "react-router-dom"
import { Avatar, BlogCardProps } from "./BlogCard"

export const Appbar = ({authorName}: BlogCardProps) => {
    return <div className="flex justify-between border-b  py-4 px-10">
        <Link to={"/blogs"} className="flex flex-col justify-center text-xl font-semibold cursor-pointer">
            Medium
        </Link>
        <div>
            <Link to={"/publish"}>
                <button className="mr-4
                 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                    + Create Post
                </button>
            </Link>
            <Avatar size={"big"} name={authorName} />
        </div>
    </div>
}