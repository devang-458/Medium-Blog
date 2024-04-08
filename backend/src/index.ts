import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const app = new Hono<{
  Bindings: {
    DATABASE_URL : string
  }
}>();

app.post('/api/v1/user/signup', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  return c.text("signup route")
});

app.post('/api/v1/user/signin', (c) => {
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
