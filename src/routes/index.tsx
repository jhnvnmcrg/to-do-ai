import { createFileRoute } from '@tanstack/react-router';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import AiChat from '@/components/AiChat';

function Home() {
    return (
        <main className='flex-col justify-center items-center text-center mx-auto max-w-4xl p-10'>
            <h1 className='mb-8 text-4xl font-bold'>AI Todo App</h1>
            <div className='my-10'>
                <AiChat />
            </div>
            <TodoForm />
            <div className='mt-10'>
                <TodoList />
            </div>
        </main>
    );
}

export const Route = createFileRoute('/')({
    component: Home
});
