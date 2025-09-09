# To-Do List App (Redux Toolkit + Local Storage)

A simple, production-ready To-Do list application built with React, Redux Toolkit, and JavaScript. The app persists state in Local Storage so data survives page reloads.

## Features

- Create, read, update, delete (CRUD) operations for todos
- Toggle completion status
- Filter todos by status (all, active, completed)
- Search todos by text
- Priority levels (low, medium, high)
- Local Storage persistence with debounced saves
- Cross-tab synchronization
- Responsive design with modern UI styling

## Tech Stack

- React (v18+)
- Redux Toolkit
- React-Redux
- JavaScript
- Vite
- Tailwind CSS

## Project Structure

```
src/
├── app/
│   └── store.js              # Redux store configuration
├── features/todos/
│   ├── todosSlice.js         # Redux slice for todos
│   ├── todosSelectors.js     # Selectors for filtering and counting
│   └── todosAPI.js           # LocalStorage helpers
├── components/
│   ├── TodoForm.jsx          # Form for adding new todos
│   ├── TodoItem.jsx          # Individual todo item with edit functionality
│   ├── TodoList.jsx          # List of todos
│   └── TodoFilters.jsx       # Filter controls
├── App.jsx                   # Main app component
└── main.jsx                  # Entry point
```

## State Shape

```json
{
  "todos": {
    "ids": ["1", "2"],
    "entities": {
      "1": {
        "id": "1",
        "text": "Learn Redux Toolkit",
        "completed": false,
        "priority": "high",
        "createdAt": "2025-09-09T08:00:00.000Z",
        "updatedAt": "2025-09-09T08:00:00.000Z"
      },
      "2": {
        "id": "2",
        "text": "Buy groceries",
        "completed": true,
        "priority": "low",
        "createdAt": "2025-09-08T20:30:00.000Z"
      }
    },
    "filters": {
      "status": "all",
      "search": ""
    }
  }
}
```

## Core Operations

- `createTodo(text, priority?)` - Add a new todo
- `readTodos()` - Get all or filtered todos
- `updateTodo(id, {text?, completed?, priority?})` - Update a todo
- `deleteTodo(id)` - Remove a todo
- `toggleComplete(id)` - Toggle completion status
- `clearCompleted()` - Remove all completed todos

## Local Storage Persistence

- Uses key `todos_v1` for storage
- Loads state on app startup
- Saves changes with 300ms debounce to avoid excessive writes
- Handles multiple tabs with storage events
- Gracefully handles unavailable or corrupted storage

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

Create a production build:
```bash
npm run build
```

## Design Notes

### Redux Implementation

- Uses Redux Toolkit's `createSlice` for clean, concise reducers
- Implements `createEntityAdapter` for normalized state and optimized selectors
- Uses Immer internally for immutable state updates
- Exposes actions and selectors for components

### Persistence Strategy

- Subscribes to store changes in `store.js`
- Debounces save operations to prevent excessive localStorage writes
- Loads initial state from localStorage on app startup
- Handles cross-tab synchronization via storage events
- Gracefully falls back to in-memory state if localStorage is unavailable

### UI/UX Features

- Form validation (non-empty, trim, 200 character limit)
- Inline editing with save/cancel options
- Keyboard support (Enter to save, Escape to cancel)
- Responsive design for mobile and desktop
- Visual feedback for completed todos (strikethrough)
- Priority badges with color coding
- Character count when approaching limit
- Accessible with proper ARIA attributes
- Modern UI with gradient backgrounds, smooth shadows, and animated transitions

### Edge Cases Handled

- LocalStorage unavailability - falls back to in-memory storage
- Duplicate IDs prevented using uuid library
- Multiple tabs - syncs via storage events
- Corrupted saved data - resets gracefully with warning

## Styling

This project uses Tailwind CSS for styling with a modern, responsive design featuring:
- Gradient backgrounds
- Smooth shadows and transitions
- Animated UI elements
- Responsive layout for all screen sizes
- Accessible color contrast and focus states

## License

This project is licensed under the MIT License.