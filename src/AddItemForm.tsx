import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styled from "styled-components";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("");
        } else {
            setError("Ошибочка, нужен текст")
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        setError(null)
        if (e.key === "Enter") {
            props.addItem(newTaskTitle);
            setNewTaskTitle("")
        }
    }


    return(
        <NewTaskStyled>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? "error" : "" }
                   placeholder="Введите название"
            />
            <button onClick={addTask} className={"not-done"}>Добавить</button>
            {error &&<div className={"error-message"}>{error }</div>}


        </NewTaskStyled>
    )
}
const NewTaskStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  max-height: 25px;

  & input {
    background-color: rgba(32, 51, 61, 0.56);
    border: none;
    border-radius: 15px;
    color: #fdfdfd;
    height: 25px;
    

    &::placeholder {
      color: #443d3d;
      padding: 25px;
    }
  }
`