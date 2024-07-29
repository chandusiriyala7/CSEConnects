import './index.css'
import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import './index.css'

function Compiler(){

    const [code,setCode] = useState('')
    const [output,setOutput] = useState('')
    const [error , setError] = useState('')
    const [language , setLanguage] = useState('cpp')
    const navigate = useNavigate()
  useEffect(() =>{
    const jwtToken = Cookies.get('jwt_token')
    if(jwtToken === undefined){
      navigate('/login')

    }
  })

    const handleSubmit = async () => {
        console.log(code)
        const payload = {
            language: language,
            code,
        }
        try{
        const { data } = await axios.post("http://localhost:8081/run",payload)
        setOutput(data.output)
        console.log(output)
         } catch(err){
            console.log(err.response)
           
         }
    }
    return(
        <div className='compiler'>
            <h1><strong>CSEConnects.Code_Compiler</strong></h1>
            <div>
                <lable>Language :</lable>
            <select 
            value = {language}
            onChange = {
                (e) =>{
                    setLanguage(e.target.value)
                   
                }
            }>
                <option value = "cpp">C++</option>
                <option value = "py">Python</option>
            </select>
            </div><br />
            <textarea rows={20} cols={150} value = {code} onChange = {(e) => setCode(e.target.value)} className='m-3' placeholder='Write Your Code with Inputs in Code Itself!'></textarea>
            <br />
            <button onClick={handleSubmit} type = "button">Compile</button>
            <p>{output}</p>
            <p>{error}</p>
        </div>
    )
}

export default Compiler