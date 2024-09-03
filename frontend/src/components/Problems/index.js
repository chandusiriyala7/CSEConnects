import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import './index.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Problems() {
    const [problems, setProblems] = useState([]);
    const [error, setError] = useState(null); // Add state to handle errors
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch problems data
        axios.get("https://cseconnects-api.onrender.com/problems")
            .then(res => {
                const data = res.data;
                setProblems(data);
            })
            .catch(err => {
                setError("Failed to fetch problems."); // Set error message
                console.error(err); // Log error details
            });
    }, []); // Empty dependency array ensures this runs once on component mount

    const handleCheckboxChange = (id, currentStatus) => {
        // Update the solved status of the problem locally
        const updatedProblems = problems.map(problem =>
            problem.id === id ? { ...problem, solved: !currentStatus } : problem
        );
        setProblems(updatedProblems);
    };

    // Calculate the total number of problems and the number of solved problems
    const totalProblems = problems.length;
    const solvedProblems = problems.filter(problem => problem.solved).length;

    return (
        <div>
            <Header />
            <div className='problems-page'>
                <div>
                    <div className="header">
                        <h1>Imp Problems</h1>
                        <button>{solvedProblems} / {totalProblems}</button> {/* Update button text */}
                    </div>
                </div>
                {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
                <ul>
                    {problems.map(each => (
                        <li className="problems" key={each.id}>
                            <div className='id'><h4>{each.id}</h4></div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={each.solved}
                                    onChange={() => handleCheckboxChange(each.id, each.solved)}
                                />
                            </div>
                            <div className='problem-title'><p>{each.title}</p></div>
                            <Link to={`/problems/${each.id}`}><button className="btn btn-primary rounded-0">View</button></Link>
                            <div className='topic'><p>{each.topic}</p></div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Problems;
