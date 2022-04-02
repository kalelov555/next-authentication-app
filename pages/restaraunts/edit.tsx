import { Form, Input, Select, Button, Space, message } from 'antd';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';


const EditRestaraunt = (categoriesBody:any) => {
  const onFinish = () => {

  }

  const handleChange = () => {

  }

  const handleChangeSelect = () => {

  }

  return <Form name="complex-form" onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
    <Form.Item label="Restaraunt name">
      <Space>
        <Form.Item
          name="name"
          noStyle
          rules={[{ required: true, message: 'Restaraunt name is required' }]}
        >
          <Input
            style={{ width: 160 }}
            placeholder="Please input"
            name="name"
            onChange={handleChange} />
        </Form.Item>
      </Space>
    </Form.Item>


    <Form.Item label="Description">
      <Form.Item
        name="description"
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginBottom: 0 }}
      >
        <Input
          placeholder="Description"
          name="description"
          onChange={handleChange} />
      </Form.Item>
    </Form.Item>

    <Form.Item label="Category">
      <Input.Group compact>
        <Form.Item
          name="categories"
          noStyle
          rules={[{ required: true, message: 'Province is required' }]}
        >
          <Select
            placeholder="Select province"
            onChange={handleChangeSelect}
          >
          </Select>
        </Form.Item>

      </Input.Group>
    </Form.Item>

    <Form.Item label=" " colon={false}>
      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </Form.Item>
  </Form>
}
