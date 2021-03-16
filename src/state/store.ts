import {combineReducers, createStore} from "redux";
import {todoListReducer} from "../reducers/tl-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";

export const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;