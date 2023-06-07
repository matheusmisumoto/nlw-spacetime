import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { notesRoutes } from './routes/notes'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'RwfTbI?:@.ZdSn+K@2jf??_pZUan-f*yQt@5',
})

app.register(authRoutes)
app.register(notesRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333🌎')
  })
