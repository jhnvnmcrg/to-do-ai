import { useEffect, useRef, useState } from 'react'
import { useStore } from '@tanstack/react-store'
import { Store } from '@tanstack/store'

import { Send, X, BotIcon } from 'lucide-react'
import { Streamdown } from 'streamdown'

import { useAIChat } from '#/lib/ai-hook'
import type { ChatMessages } from '#/lib/ai-hook'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'

export const showAIAssistant = new Store(false)

function Messages({ messages }: { messages: ChatMessages }) {
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  if (!messages.length) {
    return (
      <div className="demo-muted flex flex-1 items-center justify-center text-sm p-4 text-center h-full">
        Ask me anything! I'm here to help.
      </div>
    )
  }

  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 w-full overflow-y-auto h-0 border-b border-[var(--line)]"
    >
      {messages.map(({ id, role, parts }) => (
        <div
          key={id}
          className={`py-3 ${
            role === 'assistant' ? 'bg-[var(--chip-bg)]' : 'bg-transparent'
          }`}
        >
          {parts.map((part, index) => {
            if (part.type === 'text' && part.content) {
              return (
                <div key={index} className="flex items-start gap-2 px-4">
                  {role === 'assistant' ? (
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--lagoon-deep)] text-xs font-medium text-white">
                      AI
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--sea-ink-soft)] text-xs font-medium text-white">
                      Y
                    </div>
                  )}
                  <div className="min-w-0 flex-1 max-w-none text-sm text-[var(--sea-ink)]">
                    <Streamdown>{part.content}</Streamdown>
                  </div>
                </div>
              )
            }
            return null
          })}
        </div>
      ))}
    </div>
  )
}

export default function AIAssistantPopover() {
  const isOpen = useStore(showAIAssistant, (state) => state)
  const { messages, sendMessage } = useAIChat()()
  console.log(JSON.stringify(messages, null, 2))
  const [input, setInput] = useState('')

  const handleOpenChange = (open: boolean) => {
    showAIAssistant.setState(() => open)
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between px-4 py-2.5 h-auto"
        >
          <div className="flex items-center gap-2">
            <BotIcon size={24} />
            <span className="font-medium">AI Assistant</span>
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-96 p-0 flex flex-col overflow-hidden h-[600px] max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--line)] p-3">
          <h3 className="font-semibold text-[var(--sea-ink)] text-sm">
            AI Assistant
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleOpenChange(false)}
            className="h-6 w-6 p-0 demo-muted transition-colors hover:text-[var(--sea-ink)]"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Body / Chat Stream */}

        <Messages messages={messages} />

        {/* Footer Input */}
        <div className="p-3 bg-background">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (input.trim()) {
                sendMessage(input)
                setInput('')
              }
            }}
          >
            <div className="relative flex items-center">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="pr-10 text-sm min-h-[38px] max-h-[120px] resize-none"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height =
                    Math.min(target.scrollHeight, 120) + 'px'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && input.trim()) {
                    e.preventDefault()
                    sendMessage(input)
                    setInput('')
                  }
                }}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                disabled={!input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-[var(--lagoon-deep)] transition-colors hover:text-[var(--sea-ink)] disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}
