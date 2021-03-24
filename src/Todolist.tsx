import React, {useCallback} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    filter: FilterValuesType;
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {//todoList исп-ет state внутри себя
    console.log('Todolist is called')


    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    let tasksForTodoList = props.tasks

    if (props.filter === 'completed') {//берем фильтр, кот сидит в конкретном тудулисте
        tasksForTodoList = props.tasks.filter(t => t.isDone === true)
    }

    if (props.filter === 'active') {//берем фильтр, кот сидит в конкретном тудулисте
        tasksForTodoList = props.tasks.filter(t => t.isDone === false)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
            <IconButton onClick={removeTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => <Task
                    task={t}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todoListId={props.id}
                    key={t.id}
                />)
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "contained" : "text"} color={"primary"}
                    onClick={onActiveClickHandler}
            >Active
            </Button>
            <Button variant={props.filter === 'completed' ? "contained" : "text"} color={"secondary"}
                    onClick={onCompletedClickHandler}
            >Completed
            </Button>
        </div>
    </div>
})

