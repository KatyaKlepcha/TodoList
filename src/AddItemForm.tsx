import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }


    return <div>
        <TextField value={title}
                   variant={"outlined"}
                   label={"Type value"}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               error={!!error}//если строка не пустая и не null, тогда будет true и ошибка покажется
        />
        <Button onClick={addTask} variant={"contained"} color={"primary"}>+</Button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
}