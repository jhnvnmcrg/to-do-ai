import { chat, toServerSentEventsResponse } from '@tanstack/ai'
import { geminiText } from '@tanstack/ai-gemini'
import { createFileRoute } from '@tanstack/react-router'
import { getTodosTool } from '@/ai/tools/getTodos'
import { createTodoTool } from '@/ai/tools/createTodo'
import { updateTodoTool } from '@/ai/tools/updateTodo'
import { deleteTodoTool } from '@/ai/tools/deleteTodo'
import { SYSTEM_PROMPT } from '@/ai/systemPrompt'

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!process.env.GEMINI_API_KEY) {
          return new Response(
            JSON.stringify({
              error: 'GEMINI_API_KEY not configured',
            }),
            {
              status: 500,
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
        }

        const body = await request.json()

        try {
          const stream = chat({
            adapter: geminiText('gemini-2.5-flash'),
            systemPrompts: [SYSTEM_PROMPT],
            messages: body.messages,
            tools: [
              getTodosTool,
              createTodoTool,
              updateTodoTool,
              deleteTodoTool,
            ],
          })

          return toServerSentEventsResponse(stream)
        } catch (error) {
          return new Response(
            JSON.stringify({
              error:
                error instanceof Error ? error.message : 'An error occurred',
            }),
            {
              status: 500,
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
        }
      },
    },
  },
})
