'use client'

import React, { createContext, useEffect, useReducer, useState } from "react";
import taskReducer from './store/task-reducer'
import { MainActionType } from './store/task-reducer'
import { FiltersSeach, FilterSearchTypeValues } from './config'

export type Props = {
  children:React.ReactNode
}

export type TypeContext = {
  tasks: Task[]
  dispatchTasks: React.Dispatch<MainActionType>
  filter: FilterSearchTypeValues
  setFilter: (value:FilterSearchTypeValues)=>void
}

export const TasksContext = createContext<TypeContext|null>(null);

export const TaskProvider = ({ children }: Props) => {

  const [filter, setFilter] = useState<FilterSearchTypeValues>(FiltersSeach.ALL)
  const [tasks, dispatchTasks]= useReducer ( taskReducer, 
    [],
    () => {
    try {
      const tasksLocalStorage = window.localStorage.getItem("tasks")
      if (typeof(tasksLocalStorage)==='string') {
        return JSON.parse(tasksLocalStorage)||[]
      }
    } catch(_e) {
        return []
      }
    }
  )

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        dispatchTasks,
        filter,
        setFilter
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};