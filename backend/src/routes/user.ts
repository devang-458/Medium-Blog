import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@devang458/medium-common"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const body = await c.req.json();
        const { success } = signupInput.safeParse(body);
        if (!success) {
            c.status(411)
            return c.json({
                message: "Input not correct"
            })
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                username: body.email
            }
        })

        if (existingUser) {
            c.status(411);
            return c.json({ error: "user already exists" })
        }

        const user = await prisma.user.create({
            data: {
                username: body.email,
                password: body.password
            }
        })
        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({ token })
    } catch (error) {
        console.error("Error during signup", error)
        c.status(500)
    } finally {
        await prisma.$disconnect();
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({
            message: "Input not correct"
        })
    }
    const user = await prisma.user.findUnique({
        where: {
            username: body.email,
            password: body.password
        }
    })

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" })
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ token })
})

