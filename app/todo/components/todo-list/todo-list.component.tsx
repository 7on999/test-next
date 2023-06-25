import styles from './todo-list.module.css'
import { AddTaskForm } from "../add-task-form/add-task-form.component";
import { TasksForRender } from '../task-for-render/task-for-render.component'

function TodoList(){
  return (
    <div className={styles.wrapper}>
      <AddTaskForm/>
      <TasksForRender/> 
    </div>
  )
}

export default TodoList
 