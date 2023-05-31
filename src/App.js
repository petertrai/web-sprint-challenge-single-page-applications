import React from "react";
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import Form from './Form'

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

const Pizzalink = (props) => {

  return (
    <div>
      <h1>Pizza Form</h1>
      <form id='pizza-form'>
        <label>
          Your Name
          <input id='name-input' type='text' name='type'
          />
        </label>
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
