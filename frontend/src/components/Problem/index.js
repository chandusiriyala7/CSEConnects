import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header';
import './index.css';
import axios from 'axios';

const Problem = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState({});
    const [answer, setAnswer] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const jwtToken = Cookies.get('jwt_token');
                if (!jwtToken) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`http://localhost:8081/problems/${id}`);
                const data = response.data;
                if (data.length > 0) {
                    setProblem(data[0]);
                } else {
                    console.error('No data found');
                }
            } catch (err) {
                console.error('Error fetching problem:', err);
                // Handle error here (e.g., show a user-friendly message)
            }
        };

        fetchProblem();
    }, [id, navigate]);

    const handleAnswer = () => {
        setAnswer(prevAnswer => !prevAnswer);
    };

    // Function to visualize the problem solution line-by-line
    const visualizeSolution = () => {
        if (!problem.solution) {
            return <p>No solution available.</p>;
        }

        const solutionLines = problem.solution.split('\n');

        return (
            <div className="solution-visualization">
                <h3>Solution Visualization</h3>
                <div className="code-block">
                    {solutionLines.map((line, index) => (
                        <pre key={index} className="code-line">
                            {line}
                        </pre>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div className='problem'>
                <h1>{problem.title || 'Problem Title'}</h1>
                <p>
                    {problem.topic || 'Problem Topic'}
                    {problem.solved ? (
                        <button className='m-5'>Solved</button>
                    ) : (
                        <button className='m-5'>Not Solved</button>
                    )}
                </p>
                <strong><h4>Problem Statement</h4></strong>
                <p>{problem.statement || 'Problem Statement'}</p>
                <p><strong>Input :</strong> {problem.input || 'Input'}</p>
                <p><strong>Output :</strong> {problem.output || 'Output'}</p>
                <button onClick={handleAnswer}>Show / Hide Answer</button>
                {answer && visualizeSolution()}
            </div>
        </div>
    );
};

export default Problem;
