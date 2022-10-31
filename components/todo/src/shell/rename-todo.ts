import { Owner, Todo, TodoName, Todos } from "../core";

export type RenameTodoCommand = {
    id: string,
    name: string,
    owner: string
}

export const renameTodo = (
    todoForId: Todos.TodoForId,
    todoForName: Todos.TodoForName,
    saveTodo: Todos.SaveTodo
) => {
    return async (command: RenameTodoCommand): Promise<string> => {
        let todo = await toTodo(todoForId, todoForName, command); // impure
        todo = Todo.rename(todo, Owner.fromString(command.owner), TodoName.fromString(command.name)); // pure
        await saveTodo(todo); // impure
        return todo.id;
    }
}

// The implementation detail
const toTodo = async (
    todoForId: Todos.TodoForId, // dependency
    todoForName: Todos.TodoForName, // dependency
    command: RenameTodoCommand
): Promise<Todo.Todo> => {
    const name = TodoName.fromString(command.name);
    const doenstExist = await checkTodoDoesntExist(todoForName, name);
    if (!doenstExist) {
        throw new Error('todo with the same name already exists');
    }
    const todo = await todoForId(command.id)
    if (!todo) {
        throw new Error('todo can not be found');
    }
    return todo;
}


const checkTodoDoesntExist: Todo.CheckTodoWithSameNameDoesntExist = async (todoForName: Todos.TodoForName, name: string) => {
    const todo = await todoForName(name)
    return !todo ? true : false;
}