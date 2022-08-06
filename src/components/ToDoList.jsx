import React, { useEffect, useState, useCallback } from 'react'
import { Tabs, Layout, Row, Col,  message } from 'antd';
import './ToDoList.css';
import TodoTab from './ToDoTab';
import TodoForm from './ToDoForm';
import { createTodo, deleteTodo, loadTodos, updateTodo } from '../services/todoService';
const { TabPane } = Tabs;
const { Content} = Layout;


const TodoList = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [todos, setTodos] = useState([]);
    const [activeTodos, setActiveTodos] = useState([]);
    const [completeTodos, setCompleteTodos] = useState([]);
    const [notstartedTodos, setnotstartedTodos] = useState([]);
    const [deleteResult, setDeleteResult] = useState("");

    const handleFormSubmit = (todo) => {
        createTodo(todo).then(onRefresh());
        message.success('Todo added!');
    };

    const handleRemoveTodo = (todo) => {
        deleteTodo(todo.id)
        .then((res) => {
            message.info(res.data);
            loadTodos()
            .then(json => {
                setTodos([])
                setTodos(json);
                setnotstartedTodos(json.filter(todo => todo.status === 0));
                setActiveTodos(json.filter(todo => todo.status === 1));
                setCompleteTodos(json.filter(todo => todo.status === 2));
            }).then(console.log('fetch completed'));
        })
        .catch((err) => {
            message.warn(err.response.data);
       });
    };

    const handleToggleTodoStatus = (todo) => {
        console.log('Todo to change', todo);
        updateTodo(todo).then(onRefresh());;
        message.info('Todo state updated!');
    };

    const refresh = () => {
        loadTodos()
            .then(json => {
                setTodos(json);
                setnotstartedTodos(json.filter(todo => todo.status === 0));
                setActiveTodos(json.filter(todo => todo.status === 1));
                setCompleteTodos(json.filter(todo => todo.status === 2));
            }).then(console.log('fetch completed'));
    }

    const onRefresh = useCallback( async () => {

        setRefreshing(true);
        let data = await loadTodos();
        setTodos(data);
        setnotstartedTodos(data.filter(todo => todo.status === 0));
        setActiveTodos(data.filter(todo => todo.status === 1));
        setCompleteTodos(data.filter(todo => todo.status === 2));
        setRefreshing(false);
        console.log('Refresh state', refreshing);
    }, [refreshing]);
    useEffect(() => {
        refresh();
    }, [onRefresh]);

    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                <div className="todoList">
                    <Row>
                        <Col span={14} offset={5}>
                            <h1>My Todos</h1>
                            <TodoForm onFormSubmit={handleFormSubmit}/>
                            <br />
                            <Tabs defaultActiveKey="all" >
                                <TabPane tab="All" key="all">
                                    <TodoTab todos={todos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                                <TabPane tab="Not Started" key="notstarted">
                                    <TodoTab todos={notstartedTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                                </TabPane>
                                <TabPane tab="In Progress" key="active">
                                    <TodoTab todos={activeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                                </TabPane>
                                <TabPane tab="Completed" key="complete">
                                    <TodoTab todos={completeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}/>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    )
}

export default TodoList