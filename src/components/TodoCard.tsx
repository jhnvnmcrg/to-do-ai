import type { Todo } from '@/types/todo';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';

import { useDeleteTodo, useToggleTodo } from '@/hooks/useTodos';

interface Props {
    todo: Todo;
}

export default function TodoCard({ todo }: Props) {
    const deleteTodo = useDeleteTodo();

    const toggleTodo = useToggleTodo();

    return (
        <Card>
            <CardHeader>
                <CardTitle className={todo.is_completed ? 'line-through' : ''}>
                    {todo.title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p>{todo.description}</p>

                <Badge className='mt-3'>{todo.priority}</Badge>
            </CardContent>

            <CardFooter className='gap-2'>
                <Button
                    variant='outline'
                    onClick={() =>
                        toggleTodo.mutate({
                            id: todo.id,
                            completed: !todo.is_completed
                        })
                    }
                >
                    {todo.is_completed ? 'Undo' : 'Complete'}
                </Button>

                <Button
                    variant='destructive'
                    onClick={() => deleteTodo.mutate(todo.id)}
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}
