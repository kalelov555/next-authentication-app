import { Form, Input, Select, Button, Space, message } from 'antd';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';


const error = (response: any) => {
  message.error(`Error: ${response}`);
}

const { Option } = Select;

const AddRestaraunt = ({ categories }: { categories: any }) => {
  const router = useRouter();

  const categoriesBody = categories.data;
  const [values, setValues] = useState({
    name: "",
    description: "",
    categories: 0
  });

  const jwt = parseCookies().jwt;


  const onFinish = () => {
    axios.post("http://localhost:1337/api/restaraunts", {
      data: {
        name: values.name,
        description: values.description,
        categories: values.categories
      }
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }
    })
      .then(res => {
        console.log(res);

        router.push("/restaraunts");
      })
      .catch(err => {
        console.log(err.response);
        
        const statusText = err.response.data.error.message;
        error(statusText);
      })
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setValues((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleChangeSelect = (selectedCategory: any) => {
    setValues((prevState) => {
      return {
        ...prevState,
        categories: selectedCategory
      }
    })
  }

  return (
    <Form name="complex-form" onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
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
              {categoriesBody.map((cat: any) => {
                const { id, attributes } = cat;
                return <Option key={id} value={id}>{attributes.name}</Option>
              })}
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
  );
};

export async function getServerSideProps(ctx: any) {
  const jwt = await parseCookies(ctx).jwt;

  const resCat = await axios.get("http://localhost:1337/api/categories", {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  const categories = await resCat.data;


  return {
    props: {
      categories
    }
  }
}


export interface Attributes {
  name: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date
}


export default AddRestaraunt;
