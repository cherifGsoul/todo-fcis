import { Todo, TodoId, Todos } from "../../src/core"


let todos: Map<string, Todo.Todo> = new Map()

export const todoForName: Todos.TodoForName = async (name: string): Promise<Todo.Todo | undefined> => {
    return Array.from(todos.values()).find((todo: Todo.Todo) => {
        todo.name === name
    });
}

export const saveTodo: Todos.SaveTodo = async (todo: Todo.Todo) => {
    todos.set(todo.id, todo)
}

export const todoForId: Todos.TodoForId = async(id: TodoId.TodoId): Promise<Todo.Todo | undefined> => {
    return todos.get(id);
}

export const clearTodos = async () => {todos = new Map()}