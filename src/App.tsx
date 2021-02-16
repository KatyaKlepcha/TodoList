import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];//прежде, чем удалять, нам нужно достать нужный массив
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todoListId] = filteredTasks;//по ключу обращаемся к св-ву объекта и заменяем в нем, таски, кот мы достали, на отфильтрованные таски
        setTasks({...tasksObj})
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todoListId];
        let newTasks = [task, ...tasks];
        tasksObj[todoListId] = newTasks;
        setTasks({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }

    function changeTaskTitle(taskId: string, newTitle:string, todoListId: string) {
        //достаем нужный массив по todoListId
        let tasks = tasksObj[todoListId];
        //найдем нужную таску
        let task = tasks.find(t => t.id === taskId);
        //изменяем таску, если она нашлась
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj})
        }
    }


    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);//находим нужный тудулист, кот нужно поменять
        if (todoList) {
            todoList.filter = value;//меняем фильтр тудулисту
            setTodoLists([...todoLists])
        }
    }

    let todoListId1 = v1();
    let todoListId2 = v1();


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([ //упакуем данные в объекты (тудулист не явл объектом)
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }
    let changeTodoListTitle = (id: string, newTitle: string) => {
     const todoList = todoLists.find(tl=>tl.id===id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }


    let [tasksObj, setTasks] = useState<TasksStateType>({
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

    function addTodoList(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodoLists([todoList, ...todoLists]);
        setTasks({...tasksObj,[todoList.id]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
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

                    return <Todolist
                        key={tl.id}
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
                })
            }

        </div>
    );
}

export default App;
