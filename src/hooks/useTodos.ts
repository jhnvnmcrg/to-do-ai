import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    createTodo,
    deleteTodo,
    getTodos,
    toggleTodo,
    updateTodo
} from '../server/todo.service';

export function useTodos() {
    return useQuery({
        queryKey: ['todos'],
        queryFn: getTodos
    });
}

export function useCreateTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTodo,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos']
            });
        }
    });
}

export function useUpdateTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: any }) =>
            updateTodo(id, updates),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos']
            });
        }
    });
}

export function useDeleteTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTodo,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos']
            });
        }
    });
}

export function useToggleTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
            toggleTodo(id, completed),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todos']
            });
        }
    });
}
