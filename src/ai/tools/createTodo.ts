import { toolDefinition } from '@tanstack/ai'
import { z } from 'zod'

import { supabase } from '@/lib/supabase'

export const createTodoDefinition = toolDefinition({
  name: 'createTodo',
  description: 'Create a new todo item.',
  inputSchema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),

  outputSchema: z.object({
    success: z.boolean(),
    message: z.string(),
    todo: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      is_completed: z.boolean(),
    }),
  }),
})

export const createTodoTool = createTodoDefinition.server(
  async ({ title, description }) => {
    const { data, error } = await supabase
      .from('todos')
      .insert({
        title,
        description: description ?? null,
        is_completed: false,
      })
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return {
      success: true,
      message: `Todo "${data.title}" created successfully.`,
      todo: data,
    }
  },
)
