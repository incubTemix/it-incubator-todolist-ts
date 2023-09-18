import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import styled from "styled-components";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    addTask: (title: string, todolistId: string) => void
}

export function Todolist(props: TodolistPropsType) {


    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <StyledTodolist>
            <NameTodolist><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </NameTodolist>


            <AddItemForm addItem={addTask}/>

            <ul>
                {
                    props.tasks.map(t => {
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        return <li key={t.id}
                                   className={t.isDone ? "is-done" : ""}>
                            <CheckBoxStyled>
                                <label>
                                    <input type="checkbox"
                                           checked={t.isDone}
                                           onChange={onChangeStatusHandler}
                                    />

                                    <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                    <button onClick={onRemoveHandler}>X</button>
                                </label>
                            </CheckBoxStyled>
                        </li>
                    })
                }

            </ul>
            <AllButtomStyled>
                <AllStyled onClick={onAllClickHandler} className={props.filter === 'all' ? "active-filter" : ""}>All
                </AllStyled>
                <ActiveStyled onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? "active-filter" : ""}>Active
                </ActiveStyled>
                <CompletedStyled onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? "active-filter" : ""}>Completed
                </CompletedStyled>
            </AllButtomStyled>
        </StyledTodolist>
    )
}

const StyledTodolist = styled.div`
  display: flex;
  width: 300px;
  padding: 10px 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 45px;
  background: #FFF;
  box-shadow: 0px 40px 100px 0px rgba(0, 0, 0, 0.08), 
  0px 10px 80px 0px rgba(0, 0, 0, 0.06), 
  0px 2px 15px 0px rgba(0, 0, 0, 0.12), 
  0px 2px 4px 0px rgba(0, 0, 0, 0.06);
`


const CheckBoxStyled = styled.div`
  display: flex;
  width: 200px;
  padding: 15px;
  align-items: center;
  gap: 15px;
  border-radius: 22.5px;
  background: rgba(0, 205, 45, 0.10);
  
  
  & input {    
    margin: 0;
    height: 20px;
    width: 60px;
    background: #ffffff;
    border: 2px #ddd solid;
   

    :active {
      border-color: #800000;
      background: #800000;
    }
  }

`

const NameTodolist = styled.h3`
display: flex;
  justify-content: center;
  margin: 0;
`
const AllStyled = styled.button`
gap: 10px;
  font-size: 20px;
  

`
const ActiveStyled = styled.button`
gap: 10px;
  font-size: 20px;
`
const CompletedStyled = styled.button`
  font-size: 20px;
`
const AllButtomStyled =styled.div`
position: static;
`