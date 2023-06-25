import styles from './main.module.css'
import dynamic from 'next/dynamic'

import  TaskProvider from './todo-context'

const TodoList = dynamic(() => import( './components/todo-list/todo-list.component'), {
  ssr: false
})

function Todo(){
  return (
    <main className={styles.main}>
      <TaskProvider>
        <TodoList/>
      </TaskProvider>
    </main>   
  )
}

export default Todo