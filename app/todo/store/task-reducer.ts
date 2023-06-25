const ActionsTypes = {
  deleteTask:'DELETE-TASK',
  addTask: 'ADD-TASK',
  changeStatus: 'CHANGE-STATUS',
  changeTitle:'CHANGE-TITLE',
  changeDescription: 'CHANGE_DESCRIPTION',
} as const

const taskReducer = (state: Task[], action: MainActionType): Task[] => {
  switch (action.type) {
    case ActionsTypes.deleteTask:
      return state.filter(t=>t.id!==action.id)
    case ActionsTypes.addTask:
      return [
        ...state,
        { id:action.id, isCompleted:false, title:action.title, description:action.description }
      ]
    case ActionsTypes.changeStatus:
      return state.map(task=>task.id===action.id ? { ...task, isCompleted: action.isCompleted}:task)
    case ActionsTypes.changeDescription:
        return state.map(task=>task.id===action.id ? { ...task, description: action.description}:task)
    case ActionsTypes.changeTitle:
      return state.map(task=>task.id===action.id ? { ...task, title: action.title}:task)
    default: 
      return state
  }
}

export type MainActionType = RemoveTaskACType | AddTaskACType | ChangeStatusTaskACType | changeTitleACType |changeDescriptionACType 

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = ( id: string) => {
  return {
    type: ActionsTypes.deleteTask,
    id
  } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = ({ title, description, id} :addTaskDto ) => {
  return {
    type: ActionsTypes.addTask,
    title,
    description,
    id
  } as const
}


type ChangeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
export const changeStatusTaskAC = ( id: string, isCompleted: boolean,) => {
  return {
    type: ActionsTypes.changeStatus,
    id,
    isCompleted
  } as const
}

type changeTitleACType = ReturnType<typeof changeTitleAC>
export const changeTitleAC = ( id: string, title: string) => {
  return {
    type: ActionsTypes.changeTitle,
    id,
    title
  } as const
}

type changeDescriptionACType = ReturnType<typeof changeDescriptionAC>
export const changeDescriptionAC = ( id: string, description: string) => {
  return {
    type: ActionsTypes.changeDescription,
    id,
    description
  } as const
}

export default taskReducer;