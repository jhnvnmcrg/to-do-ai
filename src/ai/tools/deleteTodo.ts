import { toolDefinition } from '@tanstack/ai'
import { z } from 'zod'

import { supabase } from '@/lib/supabase'

export const deleteTodoDefinition = toolDefinition({
  name: 'deleteTodo',
  description: 'Delete a todo using its database ID.',
  inputSchema: z.object({
    id: z.string(),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    deletedTitle: z.string(),
  }),
})

export const deleteTodoTool = deleteTodoDefinition.server(async ({ id }) => {
  const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return {
    success: true,
    deletedTitle: data.title,
  }
})
