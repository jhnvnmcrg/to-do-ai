import ChatBubble from './ChatBubble';

interface Props {
    messages: any[];
}

export default function ChatMessages({ messages }: Props) {
    return (
        <div className='space-y-4'>
            {messages.map(message => (
                <ChatBubble key={message.id} message={message} />
            ))}
        </div>
    );
}
