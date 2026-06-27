import { supabase } from '../lib/supabase';
import type { CreateTodo, UpdateTodo } from '../types/todo';

/**
 * READ ALL TODOS
 */
export async function getTodos() {
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
}

/**
 * READ ONE TODO
 */
export async function getTodo(id: string) {
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;

    return data;
}

/**
 * CREATE TODO
 */
export async function createTodo(todo: CreateTodo) {
    const { data, error } = await supabase
        .from('todos')
        .insert(todo)
        .select()
        .single();

    if (error) throw error;

    return data;
}

/**
 * UPDATE TODO
 */
export async function updateTodo(id: string, updates: UpdateTodo) {
    const { data, error } = await supabase
        .from('todos')
        .update({
            ...updates,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

/**
 * DELETE TODO
 */
export async function deleteTodo(id: string) {
    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (error) throw error;
}

/**
 * TOGGLE COMPLETE
 */
export async function toggleTodo(id: string, completed: boolean) {
    const { data, error } = await supabase
        .from('todos')
        .update({
            is_completed: completed,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;

    return data;
}
