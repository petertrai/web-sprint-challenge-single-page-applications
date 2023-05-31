import React, { useState } from "react";
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import Form from './Form'
import axios from "axios";

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
const [formData, setFormData] = useState({
  name: '',
    size: '',
    peppronis: false,
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
      setFormData({
        name: '',
          size: '',
          peppronis: false,
          cheese: false,
          pineapples: false,
          peppers: false,
          specialInstructions: '',
        })
    })
    .catch(err => {
      console.error(err)
    })
  }

const handleChange = (e) => {
  const { name, value, type, checked } = e.target
  const valueToUse = type === 'checked' ? checked : value
  setFormData({...formData, [name]: valueToUse})
}
// make handle change, 
// tie values to formdata
  return (
    <div>
      <h1>Pizza Form</h1>
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
          Pepperonis?
          <input checked={formData.pepperonis} type='checkbox' name='pepperonis' onChange={handleChange} />
        </label><br/>
        <label>
          Special instructions
          <input onChange={handleChange} type='text' id='special-text' name='specialInstructions' value={formData.specialInstructions}></input>
        </label><br/>
        <button type='submit' onClick={handleSubmit}>Order</button>
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
