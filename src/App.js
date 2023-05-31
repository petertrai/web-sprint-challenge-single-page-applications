import React, { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import Form from './Form'
import axios from "axios";
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required('name is required').min(2, 'name must be at least 2 characters'),
  taco: yup.boolean().oneOf([true, false], 'either one is okay '),
  cheese: yup.boolean().oneOf([true, false], 'either one is okay '),
  pineapples: yup.boolean().oneOf([true, false], 'either one is okay '),
  peppers: yup.boolean().oneOf([true, false], 'either one is okay '),  
  size: yup.string().required('name is required').oneOf([1,2,3],'doggies'),
  specialInstructions: yup.string().required('name is required').min(2, 'name must be at least 2 characters')
})

const Home = (props) => {
  const navigate = useNavigate()
  const handlePizzaClick = () => {
    navigate('/pizza')
  }

  return (
    <div>
      <h1>Welcome to Pizza Johns</h1>
      <button onClick={handlePizzaClick} id='order-pizza'>Place Your Order</button>
    </div>
  )
}

const Pizzalink = () => {
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState({
    name: '',
  size: '',
  taco: '',
  cheese: '',
  pineapples: '',
  peppers: '',
  specialInstructions: '',
});
const [formData, setFormData] = useState({
  name: '',
    size: '',
    taco: false,
    cheese: false,
    pineapples: false,
    peppers: false,
    specialInstructions: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://reqres.in/api/orders', formData)
    .then(res => {
      console.log(res);
      
    })
    .catch(err => {
      console.error(err)
    })
    .finally(() => setFormData({
      name: '',
        size: '',
        taco: false,
        cheese: false,
        pineapples: false,
        peppers: false,
        specialInstructions: '',
      }))
  }

  const setFormErrors = (name, value) => {
    yup.reach(schema, name).validate(value)
    .then(() => setErrors({ ...errors, [name]: ''}))
    .catch(err => setErrors({ ...errors, [name]: err.errors[0]}))
  }

  useEffect(() => {
    schema.isValid(formData).then(valid => setDisabled(!valid))
  }, [formData])

const handleChange = (e) => {
  const { name, value, type, checked } = e.target
  const valueToUse = type === 'checkbox' ? checked : value
  setFormErrors(name, valueToUse)
  setFormData({...formData, [name]: valueToUse})
}
// make handle change, 
// tie values to formdata
  return (
    <div>
      <h1>Pizza Form</h1>
      <div>{errors.name}</div><div>{errors.size}</div><div>{errors.specialInstructions}</div><div>{errors.taco}</div><div>{errors.pineapples}</div><div>{errors.peppers}</div><div>{errors.cheese}</div>

      <form id='pizza-form' onSubmit={handleSubmit}>
        <label>
          Your Name
          <input id='name-input'
          type='text' 
          name='name' 
          value={formData.name}
          onChange={handleChange}
          />
        </label><br/>
        <label>
          Size
          <select id='size-dropdown' 
          name='size'
          value={formData.size}
          onChange={handleChange}
          >
            <option value=''>--Select--</option>
            <option value='1'>Small</option>
            <option value='2'>Medium</option>
            <option value='3'>Large</option>
          </select>
        </label><br/>
        <label>
          Pineapples?
          <input type='checkbox' name='pineapples' checked={formData.pineapples} onChange={handleChange}/>
        </label><br/>
        <label>
          Peppers?
          <input type='checkbox' name='peppers' checked={formData.peppers} onChange={handleChange}/>
        </label><br/>
        <label>
          Cheese?
          <input checked={formData.cheese} type='checkbox' name='cheese' onChange={handleChange}/>
        </label><br/>
        <label>
          Taco?
          <input checked={formData.taco} type='checkbox' name='taco' onChange={handleChange} />
        </label><br/>
        <label>
          Special instructions
          <input onChange={handleChange} type='text' id='special-text' name='specialInstructions' value={formData.specialInstructions}></input>
        </label><br/>
        <button id='order-button' type='submit' value='order' disabled={disabled}>Order</button>
      </form>
    </div>
  )

}
const App = () => {
  return (
    <>
      <div>
        <Link to='/'>Home</Link>&nbsp;
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pizza' element={<Pizzalink />} />
      </Routes>
    </>
  );
};
export default App;
