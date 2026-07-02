import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
    onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: Props) {
    const [text, setText] = useState('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!text.trim()) return;

        onSend(text);

        setText('');
    }

    return (
        <form onSubmit={handleSubmit} className='flex gap-2'>
            <Input
                placeholder='Ask your AI assistant...'
                value={text}
                onChange={e => setText(e.target.value)}
            />

            <Button type='submit'>Send</Button>
        </form>
    );
}
