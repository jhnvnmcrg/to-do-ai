🤖 AI-Powered To-Do List

An AI-powered To-Do List application built with TanStack Start, Supabase, TanStack AI, and Google Gemini. This project demonstrates modern full-stack web development by combining CRUD operations, real-time database updates, and AI-assisted task management.

---

📖 Project Overview

This application allows users to manage their daily tasks through both a traditional graphical interface and a conversational AI assistant.

Instead of manually interacting with forms, users can communicate with the AI using natural language, such as:

- "Create a High priority task called Finish Thesis."
- "How many tasks do I have?"
- "Show my completed tasks."
- "Mark Study React as completed."
- "Delete my Exercise task."

The AI understands the user's request, uses TanStack AI tool calling, and performs the appropriate CRUD operation on the Supabase database.

---

✨ Features

📋 Task Management (CRUD)

- Create new tasks
- View all tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed or pending
- Assign task priorities (Low, Medium, High)

🤖 AI Assistant

Powered by Google Gemini through TanStack AI.

The AI can:

- Create tasks
- Update tasks
- Delete tasks
- Display all tasks
- Count completed tasks
- Count pending tasks
- Suggest priorities
- Answer questions about your todo list
- Interact with the actual Supabase database using AI tool calling

⚡ Real-Time Updates

Using Supabase Realtime, the application automatically updates whenever the database changes.

No page refresh is required.

🎨 Modern UI

- Responsive layout
- Tailwind CSS
- Shadcn UI components
- Auto-scrolling AI chat
- Typing indicator
- AI suggestion buttons
- Clear chat functionality

---

🛠️ Tech Stack

Technology| Purpose
TanStack Start| React Full-Stack Framework
React 19| Frontend
TypeScript| Type Safety
Tailwind CSS| Styling
Shadcn UI| UI Components
TanStack Query| Server State Management
TanStack AI| AI Integration
Google Gemini| Large Language Model
Supabase| Database & Backend
Supabase Realtime| Live Database Updates

---

📁 Project Structure

src/
│
├── ai/
│   ├── prompts/
│   │   └── systemPrompt.ts
│   │
│   └── tools/
│       ├── createTodo.ts
│       ├── deleteTodo.ts
│       ├── getTodos.ts
│       └── updateTodo.ts
│
├── components/
│   ├── AiChat.tsx
│   ├── AiChatSession.tsx
│   ├── AiSuggestions.tsx
│   ├── ChatMessage.tsx
│   ├── TypingIndicator.tsx
│   └── TodoList.tsx
│
├── hooks/
│   ├── useAIChat.ts
│   └── useTodos.ts
│
├── lib/
│   └── supabase.ts
│
├── routes/
│   └── api/
│       └── chat.ts
│
└── server/
    └── todo.service.ts

---

🗄️ Database

The project uses Supabase.

Table

todos

Columns

- id
- title
- description
- priority
- is_completed
- created_at

---

🔄 AI Workflow

User
   │
   ▼
AI Chat
   │
   ▼
TanStack AI
   │
   ▼
Google Gemini
   │
   ▼
AI Tool Calling
   │
   ▼
Supabase
   │
   ▼
Realtime Update
   │
   ▼
React UI

---

🚀 Installation

Clone the repository

git clone <repository-url>

Install dependencies

npm install

Create a ".env" file

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key

Start the development server

npm run dev

Open

http://localhost:3000

---

🔑 Environment Variables

Variable| Description
VITE_SUPABASE_URL| Supabase Project URL
VITE_SUPABASE_ANON_KEY| Supabase Anonymous Key
GEMINI_API_KEY| Google Gemini API Key

---

🤖 AI Capabilities

The AI assistant can understand natural language such as:

Create a task called Buy Milk.

Create a High priority task called Finish Thesis.

Show all my tasks.

How many completed tasks do I have?

Mark Database Project as completed.

Delete Buy Milk.

The AI interacts with the database using TanStack AI Tool Calling, ensuring that responses reflect the current state of the user's actual todo list.

---

📚 Learning Objectives

This project demonstrates:

- RESTful API interaction through Supabase
- CRUD operations
- AI integration using TanStack AI
- Google Gemini integration
- Tool Calling with AI
- Real-time database synchronization
- Modern React development
- State management using TanStack Query
- Component-based UI development

---

🔮 Future Improvements

Possible future enhancements include:

- User authentication with Supabase Auth
- User-specific todo lists
- Due dates and reminders
- File attachments
- AI task summaries
- AI productivity insights
- Task categories
- Calendar integration
- Dark mode
- Mobile optimization

---

👨‍💻 Author

Developed as a learning project to explore:

- TanStack Start
- Supabase
- TanStack AI
- Google Gemini
- Modern React development
- AI-powered web applications

---