import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',//команда, что делать( удалить тудулист)
    id: string//данные,lkz вып этой команды
}

type AddTodoListActionType={
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodoListFilterActionType = {
    type: 'CHANGE-FILTER'
    filter: FilterValuesType
    id: string
}

type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TITLE'
    title: string
    id: string
}

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType


export const todoListReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'ADD-TODOLIST':{
            const todoListId = v1()
            let todoList: TodoListType = {
                id: todoListId,
                filter: "all",
                title: action.title
            }
            return [todoList, ...state];//вернем модифицированную копию
        }
        case 'REMOVE-TODOLIST':{
           return state.filter(tl => tl.id !== action.id)

        }
        case 'CHANGE-FILTER':{
            // let todoList = state.find(tl => tl.id === action.id);//находим нужный тудулист, кот нужно поменять
            // if (todoList) {
            //     todoList.filter = action.filter;//меняем фильтр тудулисту
            //     return [...state]
            // }
            // return state
            return state.map(tl=>{
                if (tl.id === action.id){
                    return {...tl, filter:action.filter}
                } else {
                    return tl
                }
            })
        }
        case 'CHANGE-TITLE': {
            // let todoList = state.find(tl => tl.id === action.id);//находим нужный тудулист, кот нужно поменять
            // if (todoList) {
            //     todoList.title = action.title;//меняем фильтр тудулисту
            //     return [...state]
            // }
            // return state
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
        }
        default:
            return state
    }
}

