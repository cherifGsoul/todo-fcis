import { v4 } from 'uuid';
import { addOwer } from '../../src/adapter/core';
import { compositionRoot } from './composition-root'
describe('rename todo', () => {
    const {openTodo, getTodoById, renameTodo, clearTodos} = compositionRoot
    let todoId: string, owner: string; 
    beforeEach(async () => {
        await clearTodos()
        const owner = v4()
        await addOwer(owner);
        let id = await openTodo({
            owner,
            name: 'Learn functional core imperative shell'
        });
        let todo = await getTodoById(id);
        expect(todo.id).toEqual(id);
    })

    it('should rename todo', async () => {
        const owner = v4()
        await addOwer(owner);
        let id = await openTodo({
            owner,
            name: 'Learn functional core imperative shell'
        });
        let todo = await getTodoById(id);
        expect(todo.id).toEqual(id);
        const renameCommand = {
            id,
            name: 'Learn functional programming',
            owner,
        }
        id = await renameTodo(renameCommand);
        todo = await getTodoById(id);
        expect(todo.id).toEqual(id);
        expect(todo.name).toEqual(renameCommand.name);
    });

    it('should throw when try to rename todo with wrong owner', async () => {
        const owner = v4()
        await addOwer(owner);
        let id = await openTodo({
            owner,
            name: 'Learn functional core imperative shell'
        });
        let todo = await getTodoById(id);
        expect(todo.id).toEqual(id);
        const renameCommand = {
            id,
            name: 'Learn functional programming',
            owner: v4(),
        }
        expect(async () => await renameTodo(renameCommand)).rejects.toThrowError()
    });
});