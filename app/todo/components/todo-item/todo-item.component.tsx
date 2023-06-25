'use client'

import {useContext} from 'react'
import style from './todo-item.module.css'
import { EditableTextElement } from '../editable-text-element/editable-text-element.component'
import { TasksContext, TypeContext } from "../../todo-context";
import { removeTaskAC, changeStatusTaskAC, changeTitleAC, changeDescriptionAC} from '../../store/task-reducer'
import { typeTag } from '../../config'

export const TodoItem = ({title, description, isCompleted, id}:Task)=>{

  const { dispatchTasks} = useContext(TasksContext) as TypeContext;

  const changeTitle = (id:string, title:string)=>{
    dispatchTasks(changeTitleAC(id, title))
  }

  const changeDescription = (id:string, description:string)=>{
    dispatchTasks(changeDescriptionAC(id, description))
  }

  const onRemoveClick=()=>{
    dispatchTasks(removeTaskAC(id))
}

  const onSetCompleteClick=()=>{
    dispatchTasks(changeStatusTaskAC(id, !isCompleted))
}

  return (
    <li className={isCompleted? `${style.li} ${style.compltetedLi}`:style.li}>
      <p className={style.titleAndBtn}> 
        <EditableTextElement label={title} isCompleted={isCompleted} setLabelProps={changeTitle} id={id} classname={style.title} type={typeTag.title}/>
        <span className={style.btnWrapper}>
            <button className={style.btn} onClick={onSetCompleteClick}> {!isCompleted? 'Отметить как выполненную' : 'Вернуть в список невыполненных'}</button>
            <button className={style.btn} onClick={onRemoveClick}> Удалить</button>
        </span>
      </p>
      <EditableTextElement label={description} isCompleted={isCompleted} setLabelProps={changeDescription} id={id} classname={style.description} type={typeTag.description}/>
    </li>
  )
}
