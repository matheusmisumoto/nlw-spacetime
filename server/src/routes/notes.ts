import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function notesRoutes(app: FastifyInstance) {
  app.get('/notes', async () => {
    const notes = await prisma.note.findMany({
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

  app.get('/notes/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const note = await prisma.note.findUniqueOrThrow({
      where: {
        id,
      },
    })

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
        userId: 'c27cd0c4-acb1-41ba-9be3-a433fa95bab0',
      },
    })

    return note
  })

  app.put('/notes/:id', async (request) => {
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

    const note = await prisma.note.update({
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

  app.delete('/notes/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.note.delete({
      where: {
        id,
      },
    })
  })
}
