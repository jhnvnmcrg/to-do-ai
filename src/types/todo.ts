export interface Todo {
    id: string;
    title: string;
    description: string | null;
    is_completed: boolean;
    priority: 'Low' | 'Medium' | 'High';
    created_at: string;
    updated_at: string;
}

export interface CreateTodo {
    title: string;
    description?: string;
    priority?: 'Low' | 'Medium' | 'High';
}

export interface UpdateTodo {
    title?: string;
    description?: string;
    priority?: 'Low' | 'Medium' | 'High';
    is_completed?: boolean;
}
