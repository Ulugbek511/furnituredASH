import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Typography, Flex } from 'antd';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, IValue } from '../redux/category/CategorySlice.ts';
import { AppDispatch, AppRootState } from '../redux/store';

const categorySchema = Joi.object().keys({
  image: Joi.string().required(),
  name: Joi.string().required()
});

interface ICategory {
  name: string;
  image: string;
  _id: string;
}

const Categories = () => {
  const categories: IValue[] = useSelector((state: AppRootState) => state.category.value)
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectCategory, setCategory] = useState<ICategory | undefined>(undefined)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (category) => {
    setCategory(category)
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    if (!selectCategory) {
      console.error('selectCategory is undefined');
      return;
    }
  
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: token || ''
    };
    const data = {
      name: selectCategory.name,
      image: selectCategory.image
    };
  
    try {
      const response = await axios.put(
        `https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${selectCategory._id}`,
        data,
        { headers: headers }
      );
      dispatch(fetchCategory());
      console.log('Category updated successfully', response.data);
    } catch (error) {
      console.error('Error updating category', error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form, setForm] = useState({
    image: '',
    name: ''
  });

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    dispatch(fetchCategory())
    if (!token) {
      navigate('/login');
    }
  }, [navigate, dispatch])

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/categories');
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  const handleCreate = async () => {
    try {
      const { error } = categorySchema.validate(form);
      if (error) {
        console.error(error);
        return;
      }
      const token = localStorage.getItem('token')
      const headers = {
        Authorization: token
      }
      const data = {
        name: form.name,
        image: form.image
      }
      const response = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/categories', data, {
        headers: headers
      });
      console.log(response.data);
      dispatch(fetchCategory())
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (selectCategory) {
      setCategory({
        ...selectCategory,
        [name]: value
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: token,
      }
        const response = await axios.delete(`https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${id}`, {
        headers: headers
      })
        if(response.data) {
          dispatch(fetchCategory())
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image) => <img width={100} src={image} alt="category rasmi" />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Edit',
      dataIndex: 'editOperation',
      render: (_, record) => {
        return (
          <Typography.Link onClick={() => showModal(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: 'deleteOperation',
      render: (_, record) => {
        return (
          <Typography.Link onClick={() => handleDelete(record._id)}>
            Delete
          </Typography.Link>
        );
      },
    }
  ];

  console.log(selectCategory);
  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>
Create Category
      </Button>
      <Modal
        title="Create Category"
        visible={modalVisible}
        onOk={handleCreate}
        onCancel={() => setModalVisible(false)}
      >
        <Form>
          <Form.Item label="Image">
            <Input value={form.image} onChange={(e) => setForm({...form, image: e.target.value })} />
          </Form.Item>
          <Form.Item label="Title">
            <Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value })} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal 
        title="Edit Modal" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}>
        <form action="">
          <Flex gap='middle' vertical>
            <div>
              <Input 
                placeholder='Name' 
                value={selectCategory?.name} 
                onChange={handleChange}
                name='name'
                />
            </div>
            <div>
              <Input 
                placeholder='Image' 
                value={selectCategory?.image}
                onChange={handleChange}
                name='image'
                />
            </div>
          </Flex>
        </form>
      </Modal>
      <Table columns={columns} dataSource={categories} loading={loading} />
    </div>
  );
};

export default Categories;