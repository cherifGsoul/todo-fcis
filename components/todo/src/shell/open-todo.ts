import { v4 } from "uuid"
import { TodoName, Todo, TodoStatus, Owner } from '../core'
import { OwnerFromId } from "../core/todo"
import { TodoForName, SaveTodo } from '../core/todos'

export type OpenTodoCommand = Readonly<{
    owner: string,
    name: string
}>

export const openTodo = (ownerFromId: Todo.OwnerFromId, todoForName: TodoForName, saveTodo: SaveTodo) => { 
    return async (command: OpenTodoCommand): Promise<string> => {
        const todo = await toTodo(ownerFromId, todoForName, command); 
        await saveTodo(todo);
        return todo.id;
    }
}

const toTodo = async (ownerFromId: OwnerFromId, todoForName: TodoForName, command: OpenTodoCommand): Promise<Todo.Todo> => {
    const owner = await toOwner(ownerFromId, command.owner);
    const name = TodoName.fromString(command.name);
    const doenstExist = await checkTodoDoesntExist(todoForName, name);
    if (!doenstExist) {
        throw new Error('todo with the same name already exists');
    }
    return {
        id: v4(),
        name,
        status: TodoStatus.open(),
        owner
    }
}

const toOwner = async (ownerFromId: OwnerFromId, id: string): Promise<Owner.Owner> => {
    const owner = await ownerFromId(id);
    if (!owner) {
        throw new Error('Invalid Owner');
    }
    return owner;
}

const checkTodoDoesntExist: Todo.CheckTodoWithSameNameDoesntExist = async (todoForName: TodoForName, name: string) => {
    const todo = await todoForName(name)
    return !todo ? true : false;
}