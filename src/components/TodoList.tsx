import TodoCard from './TodoCard';

import { useTodos } from '@/hooks/useTodos';

export default function TodoList() {
    const { data, isLoading, error } = useTodos();

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>Failed to load todos.</p>;

    if (!data?.length) return <p className='text-center'>No todos yet.</p>;

    return (
        <div className='grid gap-4'>
            {data.map(todo => (
                <TodoCard key={todo.id} todo={todo} />
            ))}
        </div>
    );
}
