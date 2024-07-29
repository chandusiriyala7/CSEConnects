import React , {useState, useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Coockies from 'js-cookie'
import validation from '../loginValidation'
import axios from 'axios'
import './index.css'
import Cookies from 'js-cookie'
import {v4 as uuid} from 'uuid'
function Login() {

    

    const [values,setValues] = useState({
        email: '',
        password : '',
    })
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()
    const handleInput = (event)=> {
        setValues(prev => ({...prev , [event.target.name] : [event.target.value]}))
    } 

    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(validation(values))
        if(errors.email === "" && errors.password === ""){
            
            console.log(values)
            axios.post(`http://localhost:8081/login`,values)
            .then(res => {
                if(res.data === "Success"){
                    navigate('/')
                    const jwtToken = uuid()
                    Cookies.set('jwt_token',jwtToken,{expires : 30})
                }else{
                    alert("User Doesn't Exist")
                }
                
                
            })
            .catch(err => console.log(err));
            
    }
    }
    useEffect(() =>{
        const jwtToken = Cookies.get('jwt_token')
        if(jwtToken !== undefined){
            navigate('/')
        }
    })


    return(
        <div className="d-flex justify-content-center align-items-center  vh-100 login-page">
                <div className="bg-white p-3 rounded w-25">
                    <form action = "" onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='email'><strong>Email</strong></label>
                            <input type="email" placeholder='Enter Email' className="form-control rounded-0" onChange={handleInput} name= "email"/>
                            <span>{errors.email && <span className='text-danger'>{errors.email}</span>}</span>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password'><strong>Password</strong></label>
                            <input type="password" placeholder='Enter Password' className="form-control rounded-0" onChange={handleInput} name = "password"/>
                            <span>{errors.password && <span className='text-danger'>{errors.password}</span>}</span>
                        </div>
                        <button type = "submit" className='btn btn-success w-100 rounded-0'> Login </button>
                        <p>If you are new Here!?</p>
                        <Link to = "/signup"   type = "button" className='btn btn-default border w-100 rounded-0 text-decoration-none'> Create Account </Link>
                    </form>
                </div>
        </div>
    )
}

export default Login