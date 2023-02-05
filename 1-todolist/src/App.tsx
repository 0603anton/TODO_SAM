import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    /*REMOVE*/

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    /*ADD*/

    const addTask = (title:string) => {
        const newTask = {id: v1(), title: title, isDone: true};
        setTasks([...tasks,newTask])
    }

    /*FILTER*/

    let tasksForTodoList = tasks;
    const changeFilter = (filterValue: FilterType) => {
        setFilter(filterValue)
    }

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={`What to learn`}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
