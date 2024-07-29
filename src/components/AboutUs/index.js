// src/AboutUs.js
import React from 'react';
import './index.css'; 
import Cookies from 'js-cookie'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const teamMembers = [
  {
    name: 'Lavanya',
    position: 'Backend Developer',
    image: './lavanya.jpeg',
  },
  {
    name: 'ChanduS',
    position: 'Full Stack Developer',
    image: './chandus.jpeg',
  },
  {
    name: 'Sameera',
    position: 'Frontend Developer',
    image: './sameera.jpeg',
  },
];



const AboutUs = () => {
  const navigate = useNavigate()
  useEffect(() =>{
    const jwtToken = Cookies.get('jwt_token')
    if(jwtToken === undefined){
      navigate('/login')
    }
  })
  return (
    <div className="about-us">
      <h1 className="title">About Us</h1>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="about-card">
            <img src={member.image} alt={member.name} className="picture" />
            <h2 >{member.name}</h2>
            <p className="position">{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
