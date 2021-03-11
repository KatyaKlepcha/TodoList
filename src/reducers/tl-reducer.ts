import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',//команда, что делать( удалить тудулист)
    id: string//данные,для вып этой команды
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}

type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
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
        case 'ADD-TODOLIST': {
            const todoListId = action.todoListId
            let todoList: TodoListType = {
                id: todoListId,
                filter: "all",
                title: action.title
            }
            return [todoList, ...state];//вернем модифицированную копию
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)//в state todolists приходят
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todoList = state.find(tl => tl.id === action.id);//находим нужный тудулист, кот нужно поменять
            if (todoList) {
                todoList.filter = action.filter;//меняем фильтр тудулисту
            }
            return [...state]
            // return state.map(tl => {
            //     if (tl.id === action.id) {
            //         return {...tl, filter: action.filter}
            //     } else {
            //         return tl
            //     }
            // })
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todoList = state.find(tl => tl.id === action.id);//находим нужный тудулист, кот нужно поменять
            if (todoList) {
                todoList.title = action.title;//меняем фильтр тудулисту
            }
            return [...state]


            // return state.map(tl => {
            //     if (tl.id === action.id) {
            //         return {...tl, title: action.title}
            //     } else {
            //         return tl
            //     }
            // })
        }
        default:
            //throw new Error("I don't understand this type")
        return state
    }
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        todoListId: v1()
    }
}

export const removeTodoListAC = (todoListId: string):RemoveTodoListActionType=>{
    return {
        type: 'REMOVE-TODOLIST',
        id: todoListId
    }
}
export const changeTodoListTitleAC = (id: string, title: string):ChangeTodoListTitleActionType=>{
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType):ChangeTodoListFilterActionType=>{
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: id,
        filter: filter
    }
}


