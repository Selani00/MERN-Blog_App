import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Project from './Pages/Projects'
import Dashboard from './Pages/Dashboard'
import Header from './Components/Header'
import Footer from './Components/FooterC'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/project" element={<Project/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>

      </Routes>
     <Footer/> 
      
    </BrowserRouter>
  )
}

export default App
