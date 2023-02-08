import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType} from './App';
import s from './Todolist.module.css'

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
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterType
}
const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const deleteTaskOnclickHandler = (id: string) => {
        props.removeTask(id)
    }

    const changeFilterOnclickHandler = (filterValue: FilterType) => {
        props.changeFilter(filterValue)
    }

    const addTask = (title: string) => {
        if (title.trim() !== ``) {
            props.addTask(title.trim())
            setTitle('')
            setError(false)
        } else {
            setError(true)
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.currentTarget.value
        value.trim()
        setTitle(value)
    }

    const onClickAddTaskHandler = () => {
        addTask(title)
    }

    const onKeyPressAddTasksHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (event.key === 'Enter') {
            addTask(title)
        }
    }

    const checkBoxOnChangeHandler = (id: string, isDone: boolean) => {
        props.changeStatus(id, isDone)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? s.error : ``} value={title} onChange={onChangeInputHandler}
                       onKeyDown={onKeyPressAddTasksHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
                {error ? <div className={s.errorMessage}>Enter some text</div> : null}
            </div>
            <ul>
                {props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input className={t.isDone ? s.isDone : ''}
                                   onChange={(event) => checkBoxOnChangeHandler(t.id, event.currentTarget.checked)}
                                   type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => deleteTaskOnclickHandler(t.id)}>X</button>

                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === `all` ? s.activeFilter : ``}
                        onClick={() => changeFilterOnclickHandler('all')}>All
                </button>
                <button className={props.filter === `active` ? s.activeFilter : ``}
                        onClick={() => changeFilterOnclickHandler('active')}>Active
                </button>
                <button className={props.filter === `completed` ? s.activeFilter : ``}
                        onClick={() => changeFilterOnclickHandler('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;