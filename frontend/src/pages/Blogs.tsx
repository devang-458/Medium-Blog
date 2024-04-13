import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs()

    if (loading) {
        return <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="pb-10 ">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>

        </div>
    }
    return <div>
        <Appbar />
        <div className="flex justify-center">

            <div className="">
                {blogs.map(blog =>
                    <BlogCard authorName={blog.author.name || "Anonymous"}
                        id={blog.id}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={"10th april 2024"} />)}
            </div >
        </div>
    </div>
}