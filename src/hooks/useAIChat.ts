import { useChat, fetchServerSentEvents } from '@tanstack/ai-react';

import { createChatClientOptions } from '@tanstack/ai-client';

export function useAIChat() {
    const chatOptions = createChatClientOptions({
        connection: fetchServerSentEvents('/api/chat')
    });

    return useChat(chatOptions);
}
