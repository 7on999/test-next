'use client';

import { ChangeEvent, useState, useContext } from "react"
import styles from './add-task-form.module.css'
import { v4 as uuidv4 } from 'uuid';
import {FiltersSeach } from '../../config'
import { TasksContext, TypeContext } from "../../todo-context";
import {addTaskAC } from '../../store/task-reducer'

export function AddTaskForm(){

  const { dispatchTasks, filter, setFilter} = useContext(TasksContext) as TypeContext;

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const onTitleChange = (event:ChangeEvent<HTMLInputElement>)=>{
    setTitle(event.target.value)
  }

  const onDescriptionChange = (event:ChangeEvent<HTMLTextAreaElement>)=>{
    setDescription(event.target.value)
  }

  const onBtnClick = ()=>{
    if (!title) {
      alert('Заголовок задачи не может быть пустым')
      return
    }

    dispatchTasks(addTaskAC({title, description, id:uuidv4()}))
    setTitle('')
    setDescription('')
  }

  const setFilterAll = ()=>{
    setFilter(FiltersSeach.ALL)
  }

  const setFilterActive = ()=>{
    setFilter(FiltersSeach.NOT_COMPLTETED)
  }
  const setFilterCompleted = ()=>{
    setFilter(FiltersSeach.COMPLTETED)
  }

  return (
    <div className={styles.wrapper}> 
      <input placeholder='Введите заголовок задачи' className={styles.title} value={title} onChange={onTitleChange}/>
      <textarea placeholder='Введите описание задачи' className={styles.description} value={description} onChange={onDescriptionChange}/>
      <button className={styles.btn} onClick={onBtnClick}> Добавить задачу </button> 
      <div  className={styles.btnFilterWrapper}>
        <button className={filter===FiltersSeach.ALL? `${styles.activeFilterBtn} ${styles.btnFilter}` : styles.bbtnFiltertn} onClick={setFilterAll}> Все задачи </button>
        <button className={filter===FiltersSeach.NOT_COMPLTETED? `${styles.activeFilterBtn} ${styles.btnFilter}` : styles.btnFilter} onClick={setFilterActive} > Активные </button>
        <button className={filter===FiltersSeach.COMPLTETED? `${styles.activeFilterBtn} ${styles.btnFilter}` : styles.btnFilter}onClick={setFilterCompleted} > Выполненые </button>
      </div>
    </div>
  )
}

 