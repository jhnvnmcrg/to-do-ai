import ToolActivity from './ToolActivity'

interface Props {
  message: any
}

export default function ChatBubble({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-xl px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-black dark:bg-gray-800 dark:text-white'
        }`}
      >
        {message.parts?.map((part: any, index: number) => {
          switch (part.type) {
            case 'text':
              return (
                <p key={index} className="whitespace-pre-wrap">
                  {part.content}
                </p>
              )

            case 'tool-call':
              console.log(part)

              return <ToolActivity key={index} text="Using AI tool..." />

            case 'tool-result':
              console.log(part)

              return <ToolActivity key={index} text="Tool completed." />

            default:
              return null
          }
        })}
      </div>
    </div>
  )
}
