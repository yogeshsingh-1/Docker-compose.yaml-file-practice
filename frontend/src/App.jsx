import React from 'react'
import {Routes,Route, Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Header from './pages/header/Header'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/Dashboard/Dashboard'

const App = () => {
  return (
    <>
    {/* <Header/> */}
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#"><strong>Auth</strong></Navbar.Brand>
          <Nav className="me-a uto">
            {/* <Nav.Link className='nav-line' as={Link} path="/">Home</Nav.Link>
            <Nav.Link className='nav-line' as={Link} path="/dashboard">Dashboard</Nav.Link> */}
            <Nav.Link className='nav-line' as={Link} to="/signin">Sign In</Nav.Link>
            <Nav.Link className='nav-line' as={Link} to="/signup">Sign Up</Nav.Link>
            
          </Nav>
        </Container>
      </Navbar> 
    <Routes>
      <Route path='/' element="hello world"/>
      <Route path="/signin" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
       <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    
    </>
  )
}

export default App;