import React, {ChangeEvent, useState,KeyboardEvent} from 'react';
import {FilterType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (filterValue: FilterType) => void
    addTask: (title: string) => void
}
const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState('')

    const deleteTaskOnclickHandler = (id: string) => {
        props.removeTask(id)
    }

    const changeFilterOnclickHandler = (filterValue: FilterType) => {
        props.changeFilter(filterValue)
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.currentTarget.value
        setTitle(value)
    }

    const onClickAddTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyPressAddTasksHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(title)
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeInputHandler} onKeyDown={onKeyPressAddTasksHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => deleteTaskOnclickHandler(t.id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => changeFilterOnclickHandler('all')}>All</button>
                <button onClick={() => changeFilterOnclickHandler('active')}>Active</button>
                <button onClick={() => changeFilterOnclickHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;