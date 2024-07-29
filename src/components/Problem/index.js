import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Problem = (props) =>{
    const {id} = useParams()
    const [problem,setProblem] = useState({})
    const [answer ,setAnswer] = useState()
    const navigate = useNavigate()

    useEffect(() =>{

        const jwtToken = Cookies.get('jwt_token')
        if(jwtToken === undefined){
            navigate('/login')

        } 
       
        axios.get(`http://localhost:8081/problems/${id}`).then(res =>{
            const data = res.data
            setProblem(data[0])
        }).catch({})
        console.log(problem)
    })

    const handleAnswer = () =>{
        setAnswer(!answer)
    }

    return(
        <div>
            <Header />
            <div className='problem'>
                <h1>
                    {problem.title}
                </h1>
                <p>{problem.topic}{problem.solved? (<button className='m-5'>Solved</button> ) : (<button className='m-5'>Not Solved</button>)}</p>
                <strong><h4>Problem Statement</h4></strong>
                <p>{problem.statement}</p>
                <p><strong>Input :</strong>{problem.input}</p>
                <p><strong>Output :</strong>{problem.output}</p>
                <button onClick={handleAnswer}>Show / Hide Answer</button>
                {answer && <p>{problem.solution}</p> }
            </div>
        </div>
    )
}

export default Problem