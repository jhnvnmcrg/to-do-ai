import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useCreateTodo } from '@/hooks/useTodos';

export default function TodoForm() {
    const mutation = useCreateTodo();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>(
        'Medium'
    );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!title.trim()) return;

        await mutation.mutateAsync({
            title,
            description,
            priority
        });

        setTitle('');
        setDescription('');
        setPriority('Medium');
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='space-y-4 rounded-lg border p-6'
        >
            <Input
                placeholder='Task title'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <Textarea
                placeholder='Description'
                value={description}
                onChange={e => setDescription(e.target.value)}
            />

            <select
                className='w-full rounded-md border p-2'
                value={priority}
                onChange={e =>
                    setPriority(e.target.value as 'Low' | 'Medium' | 'High')
                }
            >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>

            <Button className='w-full' disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Add Todo'}
            </Button>
        </form>
    );
}
