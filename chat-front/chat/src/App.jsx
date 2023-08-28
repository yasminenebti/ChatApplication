
import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Login from './auth/login'
import Register from './auth/Register'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>

      </Routes>
    </div>
  )
}

export default App
