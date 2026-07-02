import { toolDefinition } from '@tanstack/ai'
import { z } from 'zod'

import { supabase } from '@/lib/supabase'

export const updateTodoDefinition = toolDefinition({
  name: 'updateTodo',

  description: 'Update an existing todo item.',

  inputSchema: z.object({
    id: z.string(),
    title: z.string().optional(),
    description: z.string().nullable().optional(),
    is_completed: z.boolean().optional(),
  }),

  outputSchema: z.object({
    success: z.boolean(),
    todo: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      is_completed: z.boolean(),
    }),
  }),
})

export const updateTodoTool = updateTodoDefinition.server(
  async ({ id, title, description, is_completed }) => {
    const updates: Record<string, unknown> = {}

    if (title !== undefined) updates.title = title

    if (description !== undefined) updates.description = description

    if (is_completed !== undefined) updates.is_completed = is_completed

    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return {
      success: true,
      todo: data,
    }
  },
)
