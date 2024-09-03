
import './index.css'
import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
function NotFound (){
    const navigate = useNavigate()
  useEffect(() =>{
    const jwtToken = Cookies.get('jwt_Token')
    if(jwtToken === undefined){
      navigate('/login')    }
  })
    return(
        <div className='error'>
            <div className='not-found'>
                <img src ="https://www.digitalmesh.com/blog/wp-content/uploads/2020/05/404-error.jpg" alt ="NotFound" />
            </div>
        </div>
    )
}
export default NotFound
