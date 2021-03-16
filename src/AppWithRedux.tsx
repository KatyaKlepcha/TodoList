import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./reducers/tl-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state=>state.todoLists)
    const tasks = useSelector<AppRootState, TasksStateType>(state=>state.tasks)



    function removeTask(id: string, todoListId: string) {
        dispatch(removeTasksAC(id, todoListId))
    }

    function addTask(title: string, todoListId: string) {
        dispatch(addTaskAC(title, todoListId))
    }


    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
    }


    function changeFilter(value: FilterValuesType,todoListId: string,) {
        dispatch(changeTodoListFilterAC(value,todoListId))
    }


    let removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatch(action)
    }
    let changeTodoListTitle = (id: string, newTitle: string) => {
        const action = changeTodoListTitleAC(id, newTitle)
        dispatch(action)
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title)
        dispatch(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        //стрелочн фция вызовется столько раз, сколько объектов сидит в нашем тудулисте (у нас 2)
                        todoLists.map(tl => {//map вызывает стрелочную функция для каждого тудулиста, по кот пробегается map
                            //фильтрацию нужно делать здесь,т.к. у нас работа с каждым конкретным тудулистом идет внутри map-а
                            let tasksForTodoList = tasks[tl.id];//конкретные таски, кот попадут в todoList определяться внутри стрелочной функции
                            if (tl.filter === 'completed') {//берем фильтр, кот сидит в конкретном тудулисте
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                            }

                            if (tl.filter === 'active') {//берем фильтр, кот сидит в конкретном тудулисте
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                            }

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}//сюда попадет отфильтрованный массив тасок
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                        changeTaskTitle={changeTaskTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
