import React, { useState } from 'react'
import {  Tag, List, Button, Popconfirm,  Select, Modal, Form, Row, Col, Input ,message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
const { Option } = Select;

const Todo = ({ todo, onTodoRemoval,
  onTodoToggle}) => {

  const [modalShow, setModalShow] = useState(false);
  const [form] = Form.useForm();

  const statusList = [ {
    id: 0,
    name: "Not Started"
  },
  {
    id:1,
    name: "In Progress",
  }, {
    id: 2,
    name: "Completed"
  }];

  const priorityList = [ {
    id: 0,
    name: "Low"
  },
  {
    id: 1,
    name: "Medium"
    }, {
    id: 2,
    name: "High"
  }];

  const onbuttonclick = (e) => {
    setModalShow(true);
  }
  
  const handleCancel = () => {
    setModalShow(false);
  };

  const handleOk = () => {
    setModalShow(false);
  };


  const handleOnFinish = () => {
    if(form.getFieldValue('name') === ""){
      message.warn("Name is required!");
      return;
    }
    onTodoToggle({
      Id: todo.id,
      Name: form.getFieldValue('name') === undefined ? todo.name : form.getFieldValue('name') ,
      Status: form.getFieldValue('status') === undefined ? todo.status : form.getFieldValue('status'),
      Priority: form.getFieldValue('priority') === undefined ? todo.priority :  form.getFieldValue('priority')
    });
  };

  return (
    <List.Item
      actions={[
        <Popconfirm key={`${todo.id}-delete-popup`} title="Are you sure you want to delete?" onConfirm={() => { onTodoRemoval(todo);}}>
          <Button className="remove-todo-button" type="primary" danger  key={`${todo.id}-deletbutton`}>X</Button>
        </Popconfirm>,
        <Button onClick={(e) => onbuttonclick()} data-testid="buttonmodal" key={`${todo.id}-edit-button-modal`}><EditOutlined/></Button>,
      ]}
      className="list-item"
      key={todo.id}
      data-testid="listitem"
    >
      <List.Item.Meta
          description={todo.name}
          key={`${todo.id}-meta-key`}
        />
        <Tag key={`${todo.id}-tag-key`} color={todo.priority === 0 ? 'green' : (todo.priority === 1 ? 'orange' : 'red')} className="todo-tag">
          {todo.priority === 0 ? 'Low Priority' : (todo.priority === 1 ? 'Medium Priority' : 'High Priority')}
        </Tag>
      { <Select value={todo.status} disabled={true} key={`${todo.id}-status-select`}>
            {statusList.map((s) => (
              <Option value={s.id} key={`${todo.id}-status-select-option`}>{s.name}</Option>
            ))}
       </Select> }
       <Modal title="Edit Task" visible={modalShow} onCancel={handleCancel} 
              onOk={handleOk} 
              footer={[
                <Button type="primary" onClick={handleCancel}>Close </Button>
              ]}
              key={`${todo.id}-modal`}
              data-testid="editmodal">
          <Form form={form} onFinish={handleOnFinish} 
            initialValues={{
              ["name"]: todo.name,
              ["priority"]: todo.priority,
              ["status"]: todo.status 
             }}
             key={`${todo.id}-form-edit`}
            layout="horizontal" className="todo-form">
             <Row gutter={20}  key={`${todo.id}-rowitem`}>
              <Col xs={24} sm={24} md={15} lg={15} xl={15} key={`${todo.id}-colitem`}>
                    <Form.Item name={'name'} label="Name" key={`${todo.id}-form-item-name`}>
                        <Input  key={`${todo.id}-name-input`}/>
                    </Form.Item>
                    <Form.Item name={'priority'} label="Priority" key={`${todo.id}-form-item-priority`}>
                      <Select key={`${todo.id}-priority-select`}>
                         {priorityList.map((s) => (<Option value={s.id} key={`${todo.id}-priority-select-option`}>{s.name}</Option>))}
                      </Select>
                    </Form.Item>
                    <Form.Item name={'status'} label="Status" key={`${todo.id}-form-item-status`}>
                      <Select key={`${todo.id}-status-selectable`}>
                         {statusList.map((s) => (<Option value={s.id} key={`${todo.id}-status-selectable-option`}>{s.name}</Option>))}
                      </Select>
                    </Form.Item>
              </Col>
              
             </Row>
             <Row key={`${todo.id}-btnrowitem`}> <Button type="primary" htmlType="submit" block key={`${todo.id}-savebtn`}>Save</Button></Row>
          </Form>
        </Modal>
    </List.Item>
  )
}

export default Todo