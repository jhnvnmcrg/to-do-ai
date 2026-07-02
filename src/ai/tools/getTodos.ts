import { toolDefinition } from '@tanstack/ai'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'

export const getTodosDefinition = toolDefinition({
  name: 'getTodos',

  description: "Retrieve all todos from the user's todo list.",

  inputSchema: z.object({}),

  outputSchema: z.object({
    todos: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        is_completed: z.boolean(),
        created_at: z.string(),
      }),
    ),
  }),
})

export const getTodosTool = getTodosDefinition.server(async () => {
  const { data, error } = await supabase
    .from('todos')
    .select('id, title, description, is_completed, created_at')
    .order('created_at')

  if (error) {
    throw new Error(error.message)
  }

  return {
    todos: data,
  }
})
