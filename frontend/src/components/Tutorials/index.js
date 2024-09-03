import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import { CiSearch } from "react-icons/ci";
import { MDBContainer } from "mdb-react-ui-kit";
import Header from '../Header';

function Tutorials (){

    

    const links = [
        {
            language : 'java',
            topic : 'one shot',
            url : 'https://www.youtube.com/embed/BGTx91t8q50?si=IkbDb9lbFJJMvijP',
            title : 'Java Tutorial for Beginners 2023'
        }, 
        {
            language : 'java',
            topic : 'arrays',
            url : "https://www.youtube.com/embed/YsBUVLGAS5g?si=T3Sd3TrnLLP7CCXE",
            title : 'Arrays | Types, Declaration, Creation, Operations | Lecture 14 | Java and DSA Foundation Course'
        },
        {
            language : 'java',
            topic : 'Binary Search Tree',
            url : "https://www.youtube.com/embed/qAeitQWjNNg?si=SV127ITDG1ab7Dy_",
            title : 'Binary Search Trees | BST in One Video | Java Placement Course | Data Structures & Algorithms'
        }, 
        {
            language : 'java',
            topic : 'recursion',
            url : "https://www.youtube.com/embed/5Boqfjissv0?si=d0DLnQU8weDuKLtN",
            title : 'Recursion in One Shot | Theory + Question Practice + Code | Level 1 - Easy'
        },
        {
            language : 'java',
            topic : 'Linked List',
            url : "https://www.youtube.com/embed/oAja8-Ulz6o?si=XZT4_XL_ZF7Q9_B2",
            title : 'Java Tutorial for Beginners 2023'
        }
        ,
        {
            language : 'java',
            topic : 'Queues and Stacks',
            url : "https://www.youtube.com/embed/rHQI4mrJ3cg?si=PUaB-iHaoFlhNwH_",
            title : 'Stacks and Queues Complete Tutorial - Theory + Implementation + Types (Dynamic, Circular)'
        },
        {
            language : 'java',
            topic : 'Binary Trees',
            url : "https://www.youtube.com/embed/-DzowlcaUmE?si=VYAwZRafe-5g6H0O",
            title : 'Binary Tree in Data Structures | All about Binary Tree | DSA Course'
        },
        {
            language : 'java',
            topic : 'Graphs',
            url : "https://www.youtube.com/embed/59fUtYYz7ZU?si=d7RkOKdmvXFV304M",
            title : 'Graph Data Structure | Tutorial for Graphs in Data Structures'
        },
        {
            language : 'Cpp',
            topic : 'OneShot',
            url :"https://www.youtube.com/embed/e7sAf4SbS_g?si=bny9sNlbKXdVDrhq",
            title : 'Complete C++ Tutorial in One Shot 2023 | Beginner To Advance | Basics Of C++ Programming'
        }
    ]

    const [tutorials , setTutorials] = useState(links)


    const handleSearch = (e) =>{
        const filtered = links.filter(each =>
                each.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setTutorials(filtered)
    }
     
    return(
        <div>
            <Header />
            <div className='header'>
                <div className = "logo">
                    <img src = "data:image/jpeg;base64,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" alt ="yt" className='yt-icon' />
                   <strong><h1>Tutorials</h1></strong> 
                </div>
                <div className='search-bar'>
                    <input type = "search" onChange = {handleSearch}/>
                    <CiSearch  size = "sm"/>
                </div>
            </div>
            <div>
                <ul className='videos-list'>
                    { 
                        tutorials.map(tutorial =>(
                            <li>
                      
                               <MDBContainer>
                                <h1 className='name'>{tutorial.title}</h1>
                                <p>{tutorial.topic} in <span>{tutorial.language}</span></p>
                                    <div className="ratio ratio-16x9">
                                    <iframe width="560" height="315"
                                     src={tutorial.url} 
                                     title="YouTube video player" frameborder="0" allow="accelerometer;
                                      autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;
                                       web-share"
                                      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                    </div>
                                </MDBContainer> 
             
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Tutorials
