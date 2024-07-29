import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios';
import './index.css';

function Quiz() {
    const [quiz, setQuiz] = useState([]);
    const [activeId, setActiveId] = useState("Arrays");
    const [score, setScore] = useState(0);
    const [curr, setCurr] = useState(0);
    const [showAns, setShoWAns] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const jwtToken = Cookies.get('jwt_token')
        if(jwtToken === undefined){
            navigate('/login')
        }
        axios.get(`http://localhost:8081/quiz?topic=${activeId}`).then(res => {
            const data = res.data;
            setQuiz(data);
            setScore(0); // Reset score when topic changes
            setCurr(0); // Reset current question index when topic changes
            setShoWAns(false);
        }).catch(err => {
            console.error(err);
        });
    }, [activeId]);

    const checkAnswer = (option, answer) => {
        if (option === answer) {
            setScore(prev => prev + 1);
        }
        setCurr(prev => prev + 1);
    };

    const currentQuestion = quiz[curr];

    return (
        <div className='quizzes'>
            <div className='score'>
                <h1><strong>Quiz</strong></h1>
                <h3>{score} / {quiz.length}</h3>
            </div>
            <div className='tabs'>
                <button onClick={() => { setActiveId("Arrays") }}>Arrays</button>
                <button onClick={() => { setActiveId("Linked Lists") }}>LinkedList</button>
                <button onClick={() => { setActiveId("Stacks") }}>Stacks</button>
                <button onClick={() => { setActiveId("Queues") }}>Queues</button>
            </div>
            <h2 className='active'>{activeId}</h2>
            <div>
                {currentQuestion ? (
                    <ul className='list'>
                        <li>
                            <h4>{currentQuestion.question}</h4>
                            <div className='options'>
                            <button onClick={() => { checkAnswer(currentQuestion.option1, currentQuestion.answer) }} className='btn btn-primary'>{currentQuestion.option1}</button>
                            <button onClick={() => { checkAnswer(currentQuestion.option2, currentQuestion.answer) }} className='btn btn-primary'>{currentQuestion.option2}</button>
                            <button onClick={() => { checkAnswer(currentQuestion.option3, currentQuestion.answer) }} className='btn btn-primary'>{currentQuestion.option3}</button>
                            <button onClick={() => { checkAnswer(currentQuestion.option4, currentQuestion.answer) }} className='btn btn-primary'>{currentQuestion.option4}</button>
                            </div>
                        </li>
                    </ul>
                ) : (
                    <div className='no-more'>
                        <h1>Your Score is  :-  {score} / {quiz.length}</h1>
                        <button onClick = {() => setShoWAns(!showAns)}>Show Answers</button>
                    </div>
                )}
            </div>
            <div>
                <ol className='list -o'>
                    {showAns &&
                        quiz.map(each => (
                            <li>
                                 <h4>{each.question}</h4>
                                 <h2>Answer :-    {each.answer}</h2>
                            </li>
                           
                        ))
                    }
                </ol>
            </div>
        </div>
    );
}

export default Quiz;
