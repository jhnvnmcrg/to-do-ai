import { useState } from 'react';
import type { Todo } from '@/types/todo';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash, Check, Undo, Pencil, Loader2 } from 'lucide-react';
import { useUpdateTodo, useDeleteTodo, useToggleTodo } from '@/hooks/useTodos';

interface Props {
    todo: Todo;
}

export default function TodoCard({ todo }: Props) {
    const updateTodo = useUpdateTodo();
    const deleteTodo = useDeleteTodo();
    const toggleTodo = useToggleTodo();

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    const handleUpdate = () => {
        updateTodo.mutate(
            {
                id: todo.id,
                updates: { title, description }
            },
            {
                onSuccess: () => {
                    setIsOpen(false);
                }
            }
        );
    };

    return (
        <Card>
            <CardTitle className={todo.is_completed ? 'line-through' : ''}>
                {todo.title}
            </CardTitle>

            <CardContent
                className={
                    todo.is_completed ? 'line-through text-wrap' : 'text-wrap'
                }
            >
                <p>{todo.description}</p>
            </CardContent>

            <CardFooter className='gap-2'>
                <Button
                    variant='secondary'
                    onClick={() =>
                        toggleTodo.mutate({
                            id: todo.id,
                            completed: !todo.is_completed
                        })
                    }
                    disabled={toggleTodo.isPending}
                >
                    {todo.is_completed ? <Undo /> : <Check />}
                </Button>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant='outline'>
                            <Pencil />
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Todo</DialogTitle>
                        </DialogHeader>

                        <Input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            disabled={updateTodo.isPending}
                        />
                        <Textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            disabled={updateTodo.isPending}
                        />

                        <Button
                            className='w-full'
                            onClick={handleUpdate}
                            disabled={updateTodo.isPending}
                        >
                            {updateTodo.isPending ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Saving...
                                </>
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </DialogContent>
                </Dialog>

                <Button
                    variant='destructive'
                    onClick={() => deleteTodo.mutate(todo.id)}
                    disabled={deleteTodo.isPending}
                >
                    <Trash />
                </Button>
            </CardFooter>
        </Card>
    );
}
