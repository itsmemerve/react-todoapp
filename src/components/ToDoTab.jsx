import React from 'react'
import {  List } from 'antd';
import TodoItem from './ToDoItem';

const TodoTab = ({ todos, onTodoRemoval,
    onTodoToggle, }) => {
    return (
        <><List
            locale={{
                emptyText: "There is no item",
            }}
            dataSource={todos}
            renderItem={(todo) => (
                <TodoItem
                    todo={todo}
                    onTodoToggle={onTodoToggle}
                    onTodoRemoval={onTodoRemoval}
                />
            )}
            pagination={{
                position: 'bottom',
                pageSize: 10,
            }} /></>
    )
}

export default TodoTab