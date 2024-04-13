import { createBlogInput } from "@devang458/medium-common";
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
    const authHeader = c.req.header("Authorization") || "";
    const token = authHeader.split(" ")[1]
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id)
            await next()
        } else {
            c.status(500)
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch (error) {
        c.status(403)
        return c.json({
            message: "Internal server error", error
        })
    }

})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);

    if (!success) {
        c.status(411)
        return c.json({
            message: "Input not correct"
        })
    }

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
    })
})


blogRouter.get('/bulk', async (c) => {
    try {
        const { page = 1, pageSize = 10 } = c.req.query();
        const pageNumber: number = Number(page);
        const itemPerPage: number = Number(pageSize)

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())


        
        const blogs = await prisma.blog.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            },
            skip: (pageNumber - 1) * itemPerPage,
            take: itemPerPage
        })
        return c.json({ blogs })

    } catch (error) {
        c.status(500)
        return c.json({ error: "Internal server error" })
    }
});

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const authorId = c.get('userId')
    // const random = Math.floor(Math.random()*5)
    // const Des = [" Enthusiastic traveler, loves trying new cuisines, avid reader, passionate about photography, and enjoys outdoor adventures","Tech-savvy gamer, coffee enthusiast, music lover, fitness junkie, and passionate about DIY projects"," Creative writer, animal lover, tea connoisseur, nature enthusiast, and enjoys practicing mindfulness and yoga.","Alex: Adventure seeker, adrenaline junkie, movie buff, foodie, and passionate about environmental conservation and sustainability."," Artistic soul, loves painting and sketching, enjoys gardening, food blogger, and passionate about social justice issues."]
    // const descripArr = Des[random]

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({ blog });
    } catch (error) {
        c.status(411)
        return c.json({
            message: "Error while fetching blog post:", error
        })
    }
})