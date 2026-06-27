import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useCreateTodo } from '@/hooks/useTodos';

export default function TodoForm() {
    const mutation = useCreateTodo();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!title.trim()) return;

        await mutation.mutateAsync({
            title,
            description
        });

        setTitle('');
        setDescription('');
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='w-sm inline-block space-y-4 rounded-lg border p-6 bg-white'
        >
            <Input
                placeholder='Task title'
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />

            <Textarea
                placeholder='Description'
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
            />

            <Button className='w-full' disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Add Todo'}
            </Button>
        </form>
    );
}
