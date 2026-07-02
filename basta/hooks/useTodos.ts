import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { supabase } from '@/lib/supabase'

import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  updateTodo,
} from '../server/todo.service'

export function useTodos() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  useEffect(() => {
    const channel = supabase
      .channel('todos-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'todos',
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ['todos'],
          })
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [queryClient])

  return query
}
