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
            <div className='logo'>
                <img src="your-image-src" alt="yt" className='yt-icon' />
                <h1>Tutorials</h1>
            </div>
            <div className='search-bar'>
                <input type="search" onChange={handleSearch} />
                <CiSearch size="sm" />
            </div>
        </div>
        <div>
            <ul className='videos-list'>
                {tutorials.map(tutorial => (
                    <li key={tutorial.id}>
                        <MDBContainer>
                            <h1 className='name'>{tutorial.title}</h1>
                            <p>{tutorial.topic} in <span>{tutorial.language}</span></p>
                            <div className="ratio ratio-16x9">
                                <iframe
                                    width="560"
                                    height="315"
                                    src={tutorial.url}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </MDBContainer>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    
    )
}

export default Tutorials
