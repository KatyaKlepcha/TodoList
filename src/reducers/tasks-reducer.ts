import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./tl-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS-TASK'
    taskId: string
    isDone: boolean
    todoListId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todoListId: string
}

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todoListId]
            copyState[action.todoListId] = todoListTasks.filter(t => t.id != action.taskId)
            return copyState;//вернем модифицированную копию
        }
        case 'ADD-TASK': {
            let copyState = {...state}
            let task = {id: v1(), title: action.title, isDone: false};
            let todoListTasks = copyState[action.todoListId]
            copyState[action.todoListId] = [task, ...todoListTasks]
            return copyState
        }
        case 'CHANGE-STATUS-TASK': {
            // let copyState = {...state}
            // let todoListTasks = copyState[action.todoListId]
            // todoListTasks.map(task => {
            //     if (task.id === action.taskId) {
            //         return {...task, isDone: action.isDone}
            //     } else {
            //         return copyState
            //     }
            // })
            const copyState = {...state}
            let tasks = copyState[action.todoListId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }
            return copyState;
        }
        case 'CHANGE-TASK-TITLE': {
            // let copyState = {...state}
            // let todoListTasks = copyState[action.todoListId].map(task => {
            //         if (task.id === action.taskId) {
            //             return {...task, title: action.title}
            //         } else {
            //             return task
            //         }
            //     }
            // )
            const copyState = {...state}
            let tasks = copyState[action.todoListId];
            //найдем нужную таску
            let task = tasks.find(t => t.id === action.taskId);
            //изменяем таску, если она нашлась
            if (task) {
                task.title = action.title;
            }
            return copyState;
        }
        case "ADD-TODOLIST": {
            const copyState = {...state};
            copyState[action.todoListId] = [];
            return copyState
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state};
            delete copyState[action.id]
            return copyState
        }

        default:
            throw new Error("I don't understand this type")
    }
}

    export const removeTasksAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
        return {type: 'REMOVE-TASK', taskId, todoListId}
    }
    export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
        return {type: 'ADD-TASK', title, todoListId}
    }
    export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
        return {type: 'CHANGE-STATUS-TASK', taskId, isDone, todoListId}
    }

    export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
        return {type: 'CHANGE-TASK-TITLE', taskId, title, todoListId}
    }



