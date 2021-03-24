import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from "./reducers/tl-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer} from "./reducers/tasks-reducer";

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }

function AppWithReducers() {
    let todoListId1 = v1();
    let todoListId2 = v1();


    let [todoLists, dispatchToTodoListsReducer] = useReducer(todoListReducer, [ //упакуем данные в объекты (тудулист не явл объектом)
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListId1]: [//храним значения для отдельного тудулиста в виде такой стр-ры
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},],
        [todoListId2]: [//обращаемся не к самому св-ву todoListId1, а к тому, что в нем хранится
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},]
    })//ассоциативный массив


    function removeTask(id: string, todoListId: string) {
        dispatchToTasksReducer(removeTasksAC(id, todoListId))
    }

    function addTask(title: string, todoListId: string) {
        dispatchToTasksReducer(addTaskAC(title, todoListId))
    }


    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todoListId))
    }


    function changeFilter(value: FilterValuesType,todoListId: string,) {
        dispatchToTodoListsReducer(changeTodoListFilterAC(value,todoListId))
    }


    let removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatchToTasksReducer(action)
        dispatchToTodoListsReducer(action)
    }
    let changeTodoListTitle = (id: string, newTitle: string) => {
        const action = changeTodoListTitleAC(id, newTitle)
        dispatchToTodoListsReducer(action)
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title)
        dispatchToTasksReducer(action)
        dispatchToTodoListsReducer(action)
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
                            let tasksForTodoList = tasksObj[tl.id];//конкретные таски, кот попадут в todoList определяться внутри стрелочной функции
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

export default AppWithReducers;
