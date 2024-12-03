import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { config } from 'dotenv'
import generateSignedURLRoutes from "./apps/generate-signed-urls.js"

config()

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route("/", generateSignedURLRoutes)
const port: any = process.env.PORT! || 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
