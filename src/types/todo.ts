export interface Todo {
    id: string;
    title: string;
    description: string | null;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateTodo {
    title: string;
    description?: string;
}

export interface UpdateTodo {
    title?: string;
    description?: string;
    is_completed?: boolean;
}
