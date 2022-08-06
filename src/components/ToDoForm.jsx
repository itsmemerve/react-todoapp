import React from 'react';
import { Form, Row, Col, Button, Input, Select } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
const { Option } = Select;
const TodoForm = ({onFormSubmit}) => {
    const [form] = Form.useForm();

    const onFinish = () => {
        onFormSubmit({
            name: form.getFieldValue('name'),
            status: 0,
            priority: form.getFieldValue('priority')
        });

        form.resetFields();
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout="horizontal"
            className="todo-form"
            data-testid="todoform"
        >
            <Row gutter={20}>
                <Col xs={24} sm={24} md={15} lg={15} xl={15}>
                    <Form.Item
                        name={'name'}
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input placeholder="What needs to be done?" />
                    </Form.Item>
                    
                </Col>
                <Col xs={24} sm={24} md={7} lg={5} xl={4}>
                    <Form.Item
                        name={'priority'}
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Select
                            showSearch
                            rules={[{ required: true, message: 'This field is required' }]}
                            placeholder="Priority">
                           <Option value="0">Low</Option>
                           <Option value="1">Medium</Option>
                           <Option value="2">High</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={5} lg={4} xl={3}>
                    <Button type="primary" htmlType="submit" block>
                        <PlusCircleFilled />
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default TodoForm