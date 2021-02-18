import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)//cо старта у нас false-не режим редактирования
    let [title, setTitle] = useState('')//cо старта у нас false-не режим редактирования
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)//эта ф-ция будет запуск-ся, input будет закидывать сюда объект событие и мы втутри этой ф-ции можем обатиться к этому объекту события(input-e в кот произошло событие, и достать то значение, кот пытается напечататься, чтобы отправить его в локальный state(setTitle), локальный стэйт(setTitle) изменит title на новое значение, ф-ция перерисуется и этот title заставит input перерисовать то, что введено в этот инпут

    return editMode
        ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}