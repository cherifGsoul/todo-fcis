import { todoForName, saveTodo, todoForId, clearTodos } from './todos'
import {openTodo} from './../../src/shell/open-todo'
import {getTodoById} from './../../src/shell/get-todo-by-id'
import {renameTodo} from './../../src/shell/rename-todo'
import {ownerFromId} from './../../src/adapter/core'

export const compositionRoot = {
    get openTodo() {
        return openTodo(ownerFromId, todoForName, saveTodo)
    },

    get getTodoById() {
        return getTodoById(todoForId)
    },

    get renameTodo() {
        return renameTodo(todoForId, todoForName, saveTodo)
    },

    get clearTodos() {
        return clearTodos
    }
}