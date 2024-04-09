import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const jwt = c.req.header("Authorization") || "";
    if (!jwt) {
        c.status(401);
        return c.json({
            error: "unauthorized"
        })
    }
    const token = jwt.split(" ")[1]
    const payload = await verify(token, c.env.JWT_SECRET)
    if (!payload) {
        c.status(401)
        return c.json({ error: "unauthorized" })
    }
    c.set("userId", payload.id)
    await next()
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const authorId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })
    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userId = c.get("userId")
    const blog = await prisma.blog.update({
        where: {
            id: body.id,
            authorId: Number(userId)
        },
        data: {
            title: body.title,
            content: body.content

        }
    })
    return c.json({
        id: blog.id
    });
})

blogRouter.get('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = prisma.blog.findFirst({
            where: {
                id: body.id
            }
        })
        return c.json({
            blog
        });
    } catch (error) {
        c.status(411)
        return c.json({
            message: "Error while fetching blog post:", error
        })
    }
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const { page = 1, pageSize = 10 } = c.req.query();
        const pageNumber: number = Number(page);
        const itemPerPage: number = Number(pageSize)

        const blogs = prisma.blog.findMany({
            skip: (pageNumber - 1) * itemPerPage,
            take: itemPerPage
        })
        return c.json({ blogs })
    } catch (error) {
        c.status(500)
        return c.json({ error: "Internal server error" })
    }
});