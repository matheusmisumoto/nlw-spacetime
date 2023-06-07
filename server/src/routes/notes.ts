import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function notesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/notes', async (request) => {
    const notes = await prisma.note.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return notes.map((note) => {
      return {
        id: note.id,
        coverUrl: note.coverUrl,
        excerpt: note.content.substring(0, 120).concat('...'),
      }
    })
  })

  app.get('/notes/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const note = await prisma.note.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!note.isPublic && note.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    return note
  })

  app.post('/notes', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const note = await prisma.note.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.sub,
      },
    })

    return note
  })

  app.put('/notes/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    let note = await prisma.note.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (note.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    note = await prisma.note.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })

    return note
  })

  app.delete('/notes/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const note = await prisma.note.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (note.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    await prisma.note.delete({
      where: {
        id,
      },
    })
  })
}
