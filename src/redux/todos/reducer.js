import { ADDED, ALLCOMPLETED, CLEARCOMPLETED, COLORSELECTED, DELETED, TOGGLED } from './actionTypes';
import initialState from "./initialState";

const nextTodoId = (todos) => {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1); // getting the id whose value is the largest
    return maxId + 1; // returning the new largest id 
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADDED: 
        return [
            ...state,{
                id: nextTodoId(state), // passing the whole list of todos on which reduce() will apply,
                text: action.payload,
                completed: false
            }
        ]
        case TOGGLED: 
        return state.map(todo => {
            if(todo.id !== action.payload){ // yes, the action.payload is giving us the id, go and check em
                return todo;
            } 
            return {
                ...todo,
                completed: !todo.completed, // don't forget to manuever 
            }
        })
        case COLORSELECTED: 
        const {todoId, color} = action.payload;
        return state.map(todo => {
            if(todo.id !== todoId){
                return todo
            }
            return {
                ...todo,
                color: color
            }
        })
        case DELETED:
            return state.filter(todo => todo.id !== action.payload) 
        case ALLCOMPLETED:
            return state.map(todo => {
                return {
                    ...todo,
                    completed: true
                }
            })
            case CLEARCOMPLETED:
                return state.filter(todo => !todo.completed) // todo.completed === false   
        default: 
        return state;
    }
}
export default reducer;