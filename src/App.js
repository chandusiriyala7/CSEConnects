import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Compiler from './components/Compiler'
import Tutorials from './components/Tutorials'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AiChatbot from './components/AiChatbot'
import Problems from './components/Problems'
import Problem from './components/Problem'
import Quiz from './components/Quiz'
import AboutUs from './components/AboutUs'
import NotFound from './components/NotFound'

function App() {
  return(

  <div>
   <BrowserRouter>
      <Routes>
          <Route path = "/" element = {<Home/>} />
          <Route path = "/login" element = {<Login/>} />
          <Route path = "/signup" element = {<Signup/>} />
          <Route path = "/compiler" element = {<Compiler/>} />
          <Route path = "/tutorials" element = {<Tutorials/>} />
          <Route path = "/aichat" element = {<AiChatbot/>} />
          <Route path = "/problems" element = {<Problems />} />
          <Route path = "/problems/:id" element = { <Problem />} />
          <Route path = "/quiz" element = {<Quiz />} />
          <Route path = "/about-us" element = {<AboutUs />} />
          <Route path = "*" element = {<NotFound />} />
      </Routes>
  </BrowserRouter>
  </div>

  )
  
}

export default App
