import { Todos } from "../core";

export const getTodoById = (todoForId: Todos.TodoForId) => {
    return async (id: string) => {
        const todo = await todoForId(id)
        if (!todo) {
            throw new Error('Todo can not be found');
        }
        return todo;
    }
}