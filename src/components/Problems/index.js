import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
import axios from 'axios';
import {Link} from 'react-router-dom'

function Problems(){

    const [problems , setProblems] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const jwtToken = Cookies.get('jwt_token')
        if(jwtToken === undefined){
            navigate('/login')
        }
        axios.get("http://localhost:8081/problems").then(res=>{
            const data = res.data
            setProblems(data)
        }).catch()
    })
    return(
        <div>
            <div>
                <Header />
            </div>
            <div className='problems-page'>
            <div>
                <div className="header">
                    <h1>Imp Problems</h1>
                    <button>0 / 15</button>
                </div>
            </div >
            <ul >
                
            { problems.map(each => (
                <li className="problems">
              <div className='id'><h4>{each.id}</h4></div>
              <div><input type = "checkbox"  checked = {each.solved} /></div>  
    
              <div className='problem-title'> <p>{each.title}</p></div> 
              <Link to ={`/problems/${each.id}`}> <button className="btn btn-primary rounded-0">View</button> </Link>  
              <div className='topic'> <p>{each.topic}</p> </div> 
              </li>
               )) }
            </ul>
          
        </div>
        </div>
    )
}


export default Problems 