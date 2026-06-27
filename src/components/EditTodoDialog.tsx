import { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { Todo } from '@/types/todo';

import { useUpdateTodo } from '@/hooks/useTodos';

interface Props {
    todo: Todo;
}

export default function EditTodoDialog({ todo }: Props) {
    const mutation = useUpdateTodo();

    const [title, setTitle] = useState(todo.title);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Todo</DialogTitle>
                </DialogHeader>

                <Input value={title} onChange={e => setTitle(e.target.value)} />

                <Button
                    onClick={() =>
                        mutation.mutate({
                            id: todo.id,
                            updates: { title }
                        })
                    }
                >
                    Save
                </Button>
            </DialogContent>
        </Dialog>
    );
}
