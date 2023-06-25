'use client'

import { FiltersSeach } from '../../config'
import { TasksContext, TypeContext } from "../../todo-context";
import { useContext } from "react"
import { TodoItem } from '../todo-item/todo-item.component'
import styles from './task-for-redner.module.css'

export const TasksForRender = ():JSX.Element | null=>{
  const { tasks, filter} = useContext(TasksContext) as TypeContext;

  if (!tasks?.length) return null

  switch(filter) {
    case FiltersSeach.COMPLTETED:
      return (
        <ul className={styles.taskList}>
          { tasks?.filter(task=>task.isCompleted).map(task=>( <TodoItem key={task.id} {...task} />))}
        </ul>
      )
    case FiltersSeach.NOT_COMPLTETED:
      return (
        <ul className={styles.taskList}>
          { tasks?.filter(task=>!task.isCompleted).map(task=>( <TodoItem key={task.id} {...task}/>))}
        </ul>
      )
    case FiltersSeach.ALL:
      return (
        <ul className={styles.taskList}>
          { tasks?.map(task=>( <TodoItem key={task.id} {...task}/>))}
        </ul>
      )
    default:
      return null
  }
}