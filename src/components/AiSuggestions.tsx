const suggestions = [
  'How many tasks do I have?',
  'Show my completed tasks.',
  'Create a task called Study React.',
  'What should I prioritize today?',
]

interface Props {
  onSelect: (text: string) => void
}

export default function AiSuggestions({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className="rounded-full border px-3 py-1 text-sm hover:bg-muted"
        >
          {item}
        </button>
      ))}
    </div>
  )
}
