import { useState } from 'react'
import AiChatSession from './AiChatSession'
import { Button } from '@/components/ui/button'

export default function AiChat() {
  const [chatKey, setChatKey] = useState(0)

  return (
    <div className="rounded-xl border bg-white p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Todo AI Assistant</h2>
        <Button variant="outline" onClick={() => setChatKey((k) => k + 1)}>
          Clear Chat
        </Button>
      </div>

      <AiChatSession key={chatKey} />
    </div>
  )
}
