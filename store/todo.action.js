
import { TodoItemObject } from '../model/TodoItemObject';

export const ADD_TODO = 'ADD_TODO';
export const TODOS_LOADED = 'TODOS_LOADED';
export const LOAD_TODOS = 'LOAD_TODOS';

const data = [
    new TodoItemObject("send an email to kevyn", true),
    new TodoItemObject("finish conception step", false),
    new TodoItemObject("do the evalbox test", false)
]
const mockFetch = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), 2000)
    })
}
export function addTodo(name) {
    return {
        type: ADD_TODO,
        name
    }
}
export function todosLoaded (datas) {
    return {
        type : TODOS_LOADED,
        todos : datas,
    }
}
export function loadTodos () {
    return (dispatch) => {
        // Dispatch load todos start
        dispatch({type: LOAD_TODOS});
        return mockFetch()
            .then((datas) => dispatch(todosLoaded(datas)));
    }
}