import { useEffect, useRef, useState } from 'react'
import { useAIChat } from '@/hooks/useAIChat'
import ChatMessages from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import AiSuggestions from './AiSuggestions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AiChat() {
  const { messages, sendMessage, isLoading, error } = useAIChat()
  const [text, setText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!text.trim()) return

    await sendMessage({
      role: 'user',
      content: text,
    })

    setText('')
  }

  return (
    <div className="rounded-xl border bg-white p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Todo AI Assistant</h2>
      </div>

      <div className="h-[400px] overflow-y-auto rounded-lg border p-4">
        <ChatMessages messages={messages} />

        {isLoading && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      {error && <p className="text-red-500">{error.message}</p>}

      {text === '' && <AiSuggestions onSelect={setText} />}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="Ask anything..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button disabled={isLoading}>
          {isLoading ? 'Thinking...' : 'Send'}
        </Button>
      </form>
    </div>
  )
}
