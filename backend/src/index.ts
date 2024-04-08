import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { jwt, sign } from 'hono/jwt';

const app = new Hono<{
  Bindings: {
    DATABASE_URL : string,
    JWT_SECERT : string
  }
}>();

app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
     datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try{
    const body = await c.req.json();
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    if(existingUser){
      c.status(411);
      return c.json({error: "User already exists"})
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      }
    })

    const token = sign({id: user.id}, c.env.JWT_SECERT)

    return c.json(user);
  }catch(error){
    console.error("Error during signup:", error);
    c.status(500)
  }finally{
    await prisma.$disconnect();
  }
});


app.post('/api/v1/user/signin',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  });

  if(!user){
    c.status(403);
    return c.json({error: "user not found"})
  }

  const jwt = await sign({id: user.id}, c.env.JWT_SECERT)
  return c.text("signin route")
});

app.post('/api/v1/blog', (c) => {
  return c.text("blog")
});

app.put('/api/v1/blog', (c) => {
  return c.text("updated blog")
});

app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id');
  console.log(id)
  return c.text("get blog route")
});

app.get('/api/v1/blog/bulk', (c) => {
  return c.text("bluk route")
})


export default app
