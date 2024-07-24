import React, { useState } from 'react';
import { Form, Button } from 'antd';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

const loginSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    try {
      const { email, password } = form
      const { error } = loginSchema.validate({ email, password });
      if (error) {
        setError(error.details[0].message);
        return;
      }
      const response = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/auth', {
        email,
        password
      });
      localStorage.setItem('token', response.data);
      navigate('/products')
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const handleReset = () => {
    setForm(initialState)
  }

  return (
    <div style={{ padding: '0', margin: '0', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
      <div style={{ backgroundColor: 'white', width: '450px', height: '250px', padding: '20px', borderRadius: '6px' }}>
        <Form>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <label style={{ fontSize: '35px' }} htmlFor="email">Email: </label>
            <input style={{ borderRadius: '6px', paddingLeft: '10px', cursor: 'pointer', marginLeft: '80px', width: '300px', padding: '8px 0px', outline: 'none', backgroundColor: 'transparent', borderTop: '2px', borderColor: 'red', borderRight: '2px' }} type="text" id='email' value={form.email} name='email' onChange={handleChange} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '25px' }}>
            <label style={{ fontSize: '35px' }} htmlFor="password">Password: </label>
            <input style={{ borderRadius: '6px', paddingLeft: '10px', cursor: 'pointer', marginLeft: '80px', width: '350px', padding: '8px 0px', outline: 'none', backgroundColor: 'transparent', borderTop: '2px', borderColor: 'green', borderRight: '2px' }}  type="password" id='password' value={form.password} onChange={handleChange} name='password' />
          </div>
          <div style={{ marginLeft: '100px', marginTop: '20px' }}>
            {
              error && <p style={{ color: 'red' }}>{error}</p>
            }
          </div>
          <div>
          </div>
          <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <Button onClick={handleSubmit} type="primary" htmlType="submit">
              Login
            </Button>
            <Button onClick={handleReset} type="primary" htmlType="submit">
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;