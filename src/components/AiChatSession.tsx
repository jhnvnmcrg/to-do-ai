import { useEffect, useRef, useState } from 'react'
import { useAIChat } from '@/hooks/useAIChat'
import ChatMessages from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import AiSuggestions from './AiSuggestions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AiChatSession() {
  const { messages, sendMessage, isLoading, error } = useAIChat()
  const [text, setText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  console.log(JSON.stringify(messages, null, 2))

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
    <>
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
    </>
  )
}
