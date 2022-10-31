import { Todo, TodoName, TodoId } from ".";

export type TodoForName = (name: TodoName.TodoName) => Promise<Todo.Todo | undefined>
export type SaveTodo = (name: Todo.Todo) => Promise<void>
export type TodoForId = (id: TodoId.TodoId) => Promise<Todo.Todo | undefined>