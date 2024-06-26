import { Link } from "react-router-dom"

export interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: number
}

export const BlogCard = ({ authorName, title, content, publishedDate,id }: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="pb-4 p-4 border-b border-slate-200 w-screen max-w-screen-md cursor-pointer ">
            <div className="flex">
                <div className="flex justify-center flex-col">
                    <Avatar name={authorName} />
                </div>
                <div className="font-light pl-2">
                    {authorName}
                </div>
                <div className="pl-2 flex flex-col justify-center text-sm">
                    &#9679;
                </div>
                <div className="pl-2 font-thin text-slate-400">
                    {publishedDate}
                </div>
            </div>
            <div className="text-2xl font-bold pt-2 ">
                {title}
            </div>
            <div className="text-md font-thin " >
                {content.slice(0, 250) + "..."}
            </div>
            <div className=" bg-gray-200 w-32 justify-center mt-4 flex text-md font-thin text-gray-400 ">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </Link>
}
export function Circle() {
    return <div className="h-4 w-4 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}