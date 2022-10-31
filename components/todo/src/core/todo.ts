import { TodoStatus } from './todo-status';
import { TodoId } from "./todo-id";
import { TodoName } from "./todo-name";
import { TodoForName } from './todos';
import { Owner, equals as ownerEquals } from './owner';

export type Todo = {
    id: TodoId,
    name: TodoName,
    status: TodoStatus,
    owner: Owner,
}

export const rename = (todo: Todo, owner: Owner, newName: TodoName): Todo =>  {
    if (!ownerEquals(todo.owner, owner)) {
        throw new Error('Tried to rename the wrong todo');
    }
    return {...todo, name: newName}
}

export type CheckTodoWithSameNameDoesntExist = (todoForName: TodoForName, name: string) => Promise<boolean> // specification

export type OwnerFromId = (id: Owner) => Promise<Owner | undefined>