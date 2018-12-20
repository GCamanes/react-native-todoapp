export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODOS = 'REMOVE_TODOS';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TODOS_LOADED = 'TODOS_LOADED';
export const LOAD_TODOS = 'LOAD_TODOS';

const data = [
]
const mockFetch = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), 1000)
    })
}
export function addTodo(name) {
    return {
        type: ADD_TODO,
        name
    }
}

export function removeTodos() {
    return {
        type: REMOVE_TODOS,
    }
}

/**
 * Update Todo
 * @param todo
 * @returns {{type: string, todo: *}}
 */
export function updateTodo (todo) {
    return {
        type : UPDATE_TODO,
        todo
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