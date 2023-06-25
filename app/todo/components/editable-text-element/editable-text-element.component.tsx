'use client'

import { useState } from 'react'
import style from './editable-text-element.module.css'

import {typeTag, typeTagValues } from '../../config'

type Props = {
  isCompleted: boolean
  label: string;
  setLabelProps: (id:string, value:string)=>void;
  id: string;
  classname: string;
  type:typeTagValues
}

export const EditableTextElement = ({isCompleted, label, setLabelProps, id, classname, type}:Props):JSX.Element => {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(label)

  const setTitle = ()=>{
    const trimmedTitle = value.trim();
    if (trimmedTitle) {
      setLabelProps(id, value);
    }
  }

  const editTrue = ()=>{
    setEdit(true)
  }

  const editFalse = ()=>{
    setEdit(false);
    setTitle()
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.currentTarget.value)
  }

  return (
    edit  ?
    <input value={value} onBlur={editFalse} autoFocus onChange={onChangeHandler}/>
      :
        type===typeTag.title ? 
          <span onDoubleClick={editTrue} className={isCompleted?`${classname} ${style.labelCompleted}`: classname}> {label} </span>
          :
          <p onDoubleClick={editTrue} className={isCompleted?`${classname} ${style.labelCompleted}`: classname}> {label} </p>
  )
}

