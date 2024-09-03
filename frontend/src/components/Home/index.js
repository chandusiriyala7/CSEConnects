import Header from '../Header'
import Avatar from 'react-avatar'
import React , {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'
import {v4 as uuuid} from 'uuid'
import axios from 'axios'
import Feedback from '../Feedback'
import Cookies from 'js-cookie'
function Home() {
    
    const [blogs,setBlogs] = useState([{id:uuuid(),username : 'chandu siriyala',date : '7-july',description : 'i am Iron Man. Run Before EVeryone Walk.'},])
    const [modal,setModal] = useState(false)
    const [username,setUsername] = useState("")
    const [date,setDate] = useState("")
    const [description,setDescription] = useState("")
    const navigate = useNavigate()
 
     
    useEffect(() => {
        axios.get('http://localhost:8081/blogs')
            .then(response => setBlogs(response.data))
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);

    const closeModal = (event) => {
        event.preventDefault();

        if (username !== "" && date !== "" && description !== "") {
            const blogDetails = {
                id: uuuid(),
                username: username,
                date: date,
                description: description,
            };
            setBlogs(prev => ([...prev, blogDetails]));
            axios.post('http://localhost:8081/addblogs', blogDetails)
                .then(response => console.log('Blog added:', response.data))
                .catch(error => console.error('Error adding blog:', error));
        } else {
            alert("Enter Blog Details");
        }

        setModal(false);
    };

    const deleteBlog = (id) => {
        axios.delete('http://localhost:8081/deleteblog', { data: { id } })
            .then(response => {
                console.log('Blog deleted:', response.data);
                setBlogs(prev => prev.filter(blog => blog.id !== id));
            })
            .catch(error => console.error('Error deleting blog:', error));
    };

    return(
     <div className='home-page'>
        <div className='header'><Header /></div>
    <div className='blog-head'>
        <h1>RKV Blogs</h1>
        <button type ="button" className='btn btn-info m-3' onClick = {(e)=>{setModal(true)}}>Add Your Blog</button>
    </div>
    <div>
    {modal && (
              <div className='form'>
                    <div onClick={closeModal} className="overlay"></div>
                    <form className="modal-content" onSubmit={closeModal}>
                   <label htmlFor = "username">Username<input type = "text" name = "username" placeholder='Enter Username' className='form-control rounded-0' onChange = {(e)=>{setUsername(e.target.value)}}/></label> 
                   <label htmlFor = "date">Date<input type = "date" name = "username"  placeholder='Enter Data' className='form-control rounded-0'  onChange = {(e)=>{setDate(e.target.value)}}/></label>  
                   <label>Description<textarea rows = {4} cols = {60} onChange={(e) => {setDescription(e.target.value)}}></textarea></label>
                  <button className="close-modal" type = "submit">
                        Save
                 </button>
                    </form>
              </div>
            )}
    </div>
       <ul className="blog-list">
        {blogs.map((blog) => (
          <li className="blog-card" key={blog.id}>
            <div className="avatar-username">
              <div className="avatar-container">
                <Avatar name={blog.username} size={50} round="25px" />
              </div>
              <div className="username-container">
                <p><strong>{blog.username}</strong></p>
                <p className="date-text">{blog.date}</p>
              </div>
            </div>
            <div className="blog-description">
              <p>{blog.description}</p>
            </div>
            <div className="delete-container">
              <button type="button" className="btn btn-danger delete-btn" onClick={() => deleteBlog(blog.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
        <div className='p-5'>
            <Feedback />
        </div>
     </div>
    )
}

export default Home
