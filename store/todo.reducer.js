import {ADD_TODO, UPDATE_TODO, REMOVE_TODOS, LOAD_TODOS, TODOS_LOADED} from './todo.action';
export const initialState = {
    list: [],
    loading: false,
    loaded: false,
};
export function todosReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_TODOS: {
            return {
                ...state,
                loading: true,
                loaded : false,
            }
        }
        case TODOS_LOADED: {
            return {
                ...state,
                list : action.todos,
                loading: false,
                loaded : true,
            }
        }
        case ADD_TODO: {
            return {
                ...state,
                list: [...state.list, {id: state.list.length+1, title:action.name, isDone: false}],
            }
        }
        case REMOVE_TODOS: {
            return {
                ...state,
                list: []
            }
        }    
        case UPDATE_TODO: {
            // Find Todo to update in the todos list
            const updateTodo = state.list.find(item => item.id === action.todo.id);
            updateTodo.isDone = !updateTodo.isDone;
        
            // Filter other Todos
            const others = state.list.filter(item => item.id !== action.todo.id);
        
            return {
                ...state,
                list: [...others, updateTodo].sort((a, b) => a.id - b.id)
            }
        }
        default :
            return state;
    }
};