import React , {useState } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import validation from '../signupValidation'
import axios from 'axios'
import './index.css'

function Signup() {
    const [values,setValues] = useState({
        name : '',
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
        console.log(errors)
        if(errors.name === "" && errors.email === "" && errors.password === ""){
                axios.post(`http://localhost:8081/signup`,values)
                .then(res => {
                    if(res.statusText === "OK"){
                       navigate('/login')
                    }
                })
                .catch(err => console.log(err));
                
        }
    }

    return(
        <div className="d-flex justify-content-center align-items-center signup-page vh-100">
                <div className="bg-white p-3 rounded w-25">
                    <h2>Signup</h2>
                    <form action = ""  onSubmit ={handleSubmit}>
                    <div className='mb-3'>
                            <label htmlFor='name'><strong>Name</strong></label>
                            <input type="text" placeholder='Enter Name' className="form-control rounded-0" onChange={handleInput} name = "name"/>
                            <span>{errors.name && <span className='text-danger'>{errors.name}</span>}</span>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='email'><strong>Email</strong></label>
                            <input type="email" placeholder='Enter Email' className="form-control rounded-0" onChange={handleInput} name = "email"/>
                            <span>{errors.email && <span className='text-danger'>{errors.email}</span>}</span>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password'><strong>Password</strong></label>
                            <input type="password" placeholder='Enter Password' className="form-control rounded-0" onChange={handleInput} name = "password"/>
                            <span>{errors.password && <span className='text-danger'>{errors.password}</span>}</span>
                        </div>
                        <button type = "submit" className='btn btn-success w-100 rounded-0'> Signup </button>
                        <p>Existing User or Created Account!?</p>
                        <Link to = "/login"   type = "button" className='btn btn-default border w-100 rounded-0 text-decoration-none'> Create Account </Link>
                    </form>
                </div>
        </div>
    )
}

export default Signup