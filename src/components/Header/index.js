import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './index.css'
import {Link , useNavigate} from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie'

const Header = () => {
  
  const navigate = useNavigate();
  const logos = [
        'Bloging',
        'Learning',
        'Coding',
        'Sharing'
      ];
    const handleLogout = () =>{
      Cookies.remove('jwt_token')
      navigate('/login')
    }

    return(
        <div className='header'>
    <Navbar expand="lg" bg = "#ffffff" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home"><div className="navbar nav">
      <div className="logo-container">
      <div>CseConnects.</div>
        <div className="scrolling-logos">
          {logos.map((logo, index) => (
            <li key = {logo}>{logo}</li>
          ))}
          {logos.map((logo, index) => (
           <li key = {logo} >{logo}</li>
          ))}
        </div>
      </div>
    </div>
    </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto sections" >
          <Link to ="/"> <Nav.Link href="#home" className='item'>Home</Nav.Link></Link> 
           <Link to = "/compiler"><Nav.Link href="#link" className='item'>CodePlayground</Nav.Link></Link> 
           <NavDropdown title="Resources" id="basic-nav-dropdown" className='item'>
           <Link to = "/tutorials"> <NavDropdown.Item href="#action/3.1">Tutorials</NavDropdown.Item></Link>
              <NavDropdown.Divider />
              <Link to ="/problems"> 
              <NavDropdown.Item href="#action/3.2">
                Problems
                </NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
             <Link to = "/quiz"><NavDropdown.Item href="#action/3.3 ">Quiz</NavDropdown.Item></Link>   
            <NavDropdown.Divider />
            </NavDropdown> 
           <Link to = "/aichat"><Nav.Link href="#link" className='item'>AiChatbot</Nav.Link></Link> 
            <Link  to = "/about-us"className='contact'>AboutUs</Link>
            <button className='logout' onClick = {handleLogout}>Logout</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default Header